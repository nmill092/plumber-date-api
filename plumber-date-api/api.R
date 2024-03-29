pacman::p_load(lubridate, hms)

#* @apiTitle R Plumber Date Calculator
#* @apiDescription An API that helps you calculate dates in the future or past based on a specified start date.

#* @filter cors
cors <- function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*")

  if (req$REQUEST_METHOD == "OPTIONS") {
    res$setHeader("Access-Control-Allow-Methods","*")
    res$setHeader("Access-Control-Allow-Headers", req$HTTP_ACCESS_CONTROL_REQUEST_HEADERS)
    res$status <- 200
    return(list())
  } else {
    plumber::forward()
  }
}

#* @filter logger
function(req) {
  print(paste(req$REQUEST_METHOD, "request from", req$REMOTE_ADDR))
  plumber::forward()
}

#* Add or subtract days, weeks, months, or years to or from a specified start date.
#* @get /date
#* @serializer unboxedJSON
#* @param start:str The start time/date, in the format M-D-Y, D-M-Y, or Y-M-D
#* @param method:str The operation to perform on the start date. Valid params include "add" or "subtract"
#* @param number:int The number of days, weeks, months, or years to add to the start date (must be an integer).
#* @param units:str The unit of time to add. Valid params include "days," "weeks," "months," "years
function(req, res, start, method, number, units) {
  tryCatch({
    date <- lubridate::parse_date_time(start, orders = c("mdy", "dmy", "ymd"))

    fn <- switch(
      units,
      "days" = lubridate::days,
      "weeks" = lubridate::weeks,
      "months" = lubridate::dmonths,
      "years" = lubridate::years
    )

    result <- switch(
      method,
      "add" = date + fn(as.numeric(number)),
      "subtract" = date - fn(as.numeric(number))
    )

    if(any(is.na(date), is.null(fn), is.null(result))) stop()

    formatted_result <- format(result, "%B %m, %Y")

    list(
      start_date = start,
      parsed_date = date,
      operation = paste(method, number, units),
      result_date = formatted_result
    )
  }, error = function(x) {
    list(error = "Server failed to handle your request due to missing or invalid parameters. Refer to the documentation to view required parameters and types.")
  })
}

#* Lists all valid time zones
#* @get /time-zones
function(req, res) {
  OlsonNames()
}

#* Get current time in requested time zone (GET /time-zones to see a list of recognized time zones)
#* @get /time-in
#* @serializer unboxedJSON
#* @param tz:str
#* @param sourceTz:str
function(req, res, tz, sourceTz) {
  
 tryCatch({
   requestedTz <- gsub("%20|\\s",replacement = "_", tz)
   converted_time <- with_tz(time = Sys.time(),tzone = requestedTz)
   difftime_string <- as_hms(force_tz(Sys.time(), tzone = sourceTz) - force_tz(Sys.time(), tzone = requestedTz))
   
     list(sysTime = format(Sys.time(), "%B %d, %Y %I:%M:%S %p"),
        requestedTz = tz,
        convertedTime = format(converted_time, "%B %d, %Y %I:%M:%S %p"),
        diffTime = difftime_string,
        isDst = dst(converted_time))
   
 }, error = function(x) { 
   print(as.character(x))
   list(errorMsg = as.character(x), error = "Invalid request. Please GET /time-zones to see a list of available time zones and their required formatting.")
   })
}