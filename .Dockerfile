FROM rstudio/plumber
# Create and change to the app directory.
WORKDIR .
# Copy local code to the container image.
COPY . .
RUN Rscript install_packages.R
EXPOSE 8080
# Run the web service on container startup.
CMD [ "Rscript", "init.R"]