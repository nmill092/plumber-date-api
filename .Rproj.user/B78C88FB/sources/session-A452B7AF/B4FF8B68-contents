install.packages("pacman")
pacman::p_load("lubridate" )

#* @apiTitle R Plumber Date Calculator

#* Add or subtract days, weeks, months, or years to or from a specified start date. 
#* @get /date 
#* @serializer unboxedJSON
#* @param start The start time/date, in the format M-D-Y, D-M-Y, or Y-M-D 
#* @param method The operation to perform on the start date. Valid params include "add" or "subtract"
#* @param number:int The number of days, weeks, months, or years to add to the start date (must be an integer). 
#* @param units The unit of time to add. Valid params include "days," "weeks," "months," "years
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
    list(error = "Server failed to handle your request due to missing or invalid parameters.")
  })
}
