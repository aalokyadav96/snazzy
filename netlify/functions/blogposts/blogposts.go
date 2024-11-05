package main

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type BlogPost struct {
	Title   string `json:"title"`
	Excerpt string `json:"excerpt"`
	URL     string `json:"url"`
}

// The handler function for API Gateway requests
func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	// Log message for debugging
	fmt.Println("This message will show up in the CLI console.")

	// Create an array of blog posts
	blogPosts := []BlogPost{
		{
			Title:   "How to Build a Portfolio with JavaScript",
			Excerpt: "In this post, I walk you through building a portfolio website from scratch using JavaScript and a little bit of CSS.",
			URL:     "https://your-blog.com/portfolio-building",
		},
		{
			Title:   "Understanding Asynchronous JavaScript",
			Excerpt: "This post explains asynchronous programming in JavaScript, including callbacks, promises, and async/await.",
			URL:     "https://your-blog.com/async-javascript",
		},
		{
			Title:   "Web Accessibility Best Practices",
			Excerpt: "This article covers key web accessibility practices, making your websites more accessible to all users, including those with disabilities.",
			URL:     "https://your-blog.com/web-accessibility",
		},
	}

	// Marshal the array of blog posts into JSON format
	body, err := json.Marshal(map[string]interface{}{
		"posts": blogPosts,
	})

	if err != nil {
		// Log the error and return an internal server error response
		fmt.Println("Error marshalling blog posts:", err)
		return &events.APIGatewayProxyResponse{
			StatusCode:      500,
			Headers:         map[string]string{"Content-Type": "application/json"},
			Body:            `{"error": "Unable to fetch blog posts"}`,
			IsBase64Encoded: false,
		}, nil
	}

	// Return the response with the blog posts in JSON format
	return &events.APIGatewayProxyResponse{
		StatusCode:      200,
		Headers:         map[string]string{"Content-Type": "application/json"},
		Body:            string(body),
		IsBase64Encoded: false,
	}, nil
}

func main() {

	lambda.Start(handler)
}
