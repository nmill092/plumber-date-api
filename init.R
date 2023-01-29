pacman::p_load("plumber", "here")
here::i_am("init.R")

library(plumber)

pr(here("api.R")) %>% pr_run(port=5501)