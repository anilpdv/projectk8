# Use the official Python image as the base image
FROM python:3.9

# Set the working directory to /app
WORKDIR /app

# Copy the requirements file into the container and install the dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN libretranslate --load-only fr,en,fi

# Copy the rest of the application code into the container
COPY . .


# Set the environment variable for Flask to run in production mode
ENV FLASK_DEBUG=1

# Expose port 8000
EXPOSE 8000

# Start the Flask app
CMD ["gunicorn", "-b", "0.0.0.0:8000", "wsgi:app"]
