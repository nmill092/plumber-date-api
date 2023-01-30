pacman::p_load("here")
here::i_am("init.R")

library(plumber)

pr <- plumb("api.R")
pr$run(host = "0.0.0.0", port=Sys.getenv("PORT"))