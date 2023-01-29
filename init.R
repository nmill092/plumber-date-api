pacman::p_load("here")
here::i_am("init.R")

library(plumber)

print("Initializing API")

pr <- plumb("api.R")
pr$run(host = "0.0.0.0", port=8001)