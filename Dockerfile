FROM rstudio/plumber
# Create and change to the app directory.
WORKDIR .
# Copy local code to the container image.
COPY . .
RUN Rscript install_packages.R
EXPOSE 8001
# Run the web service on container startup.
ENTRYPOINT ["Rscript", "init.R"]
