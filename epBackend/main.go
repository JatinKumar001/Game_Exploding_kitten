package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()

type ScoreEntry struct {
	Username string `json:"username"`
	Score    int    `json:"score"`
}

func main() {
	client := redis.NewClient(&redis.Options{
		Addr:     "redis-18483.c305.ap-south-1-1.ec2.redns.redis-cloud.com:18483",
		Password: "FJeBSktS2q2P2QGBLMsyiekmtjGynLLz",
		DB:       0,
	})

	// Test connection to Redis
	_, err := client.Ping(ctx).Result()
	if err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	}

	http.HandleFunc("/api/leaderboard", func(w http.ResponseWriter, r *http.Request) {
		// Setting CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		switch r.Method {
		case http.MethodPost:
			// Handle POST to add or update score
			var entry ScoreEntry
			if err := json.NewDecoder(r.Body).Decode(&entry); err != nil {
				http.Error(w, "Invalid input", http.StatusBadRequest)
				return
			}
			defer r.Body.Close()

			// Validate the entry
			if entry.Username == "" || entry.Score <= 0 {
				http.Error(w, "Invalid username or score", http.StatusBadRequest)
				return
			}

			if _, err := client.ZAdd(ctx, "leaderboard", redis.Z{
				Score:  float64(entry.Score),
				Member: entry.Username,
			}).Result(); err != nil {
				log.Printf("Error adding score to leaderboard: %v", err)
				http.Error(w, "Failed to update leaderboard", http.StatusInternalServerError)
				return
			}

			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode("Score added or updated")

		case http.MethodGet:
			// Handle GET to retrieve leaderboard data
			leaderboard, err := client.ZRevRangeWithScores(ctx, "leaderboard", 0, 9).Result()
			if err != nil {
				http.Error(w, "Could not retrieve leaderboard", http.StatusInternalServerError)
				return
			}

			var leaderboardData []map[string]interface{}
			for _, entry := range leaderboard {
				leaderboardData = append(leaderboardData, map[string]interface{}{
					"username": entry.Member,
					"score":    entry.Score,
				})
			}

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(leaderboardData)

		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	log.Println("Server is running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
