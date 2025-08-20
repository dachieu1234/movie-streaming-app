-- PostgreSQL schema + seed (minimal)
CREATE TABLE IF NOT EXISTS countries (id SERIAL PRIMARY KEY, name VARCHAR UNIQUE);
CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY, title VARCHAR NOT NULL, slug VARCHAR UNIQUE NOT NULL,
  description TEXT, release_date DATE, duration INT, type VARCHAR NOT NULL,
  poster_url TEXT, cover_url TEXT, country_id INT, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS genres (id SERIAL PRIMARY KEY, name VARCHAR UNIQUE);
CREATE TABLE IF NOT EXISTS movie_genres (movie_id INT, genre_id INT, PRIMARY KEY(movie_id, genre_id));
CREATE TABLE IF NOT EXISTS actors (id SERIAL PRIMARY KEY, name VARCHAR, bio TEXT, birth_date DATE, photo_url TEXT);
CREATE TABLE IF NOT EXISTS movie_actors (movie_id INT, actor_id INT, role VARCHAR, PRIMARY KEY(movie_id, actor_id));
CREATE TABLE IF NOT EXISTS seasons (id SERIAL PRIMARY KEY, movie_id INT, season_number INT, title VARCHAR, description TEXT);
CREATE TABLE IF NOT EXISTS episodes (id SERIAL PRIMARY KEY, season_id INT, episode_number INT, title VARCHAR, description TEXT, duration INT, release_date DATE);
CREATE TABLE IF NOT EXISTS video_sources (id SERIAL PRIMARY KEY, movie_id INT, episode_id INT, quality VARCHAR, language VARCHAR, url TEXT);
CREATE TABLE IF NOT EXISTS subtitles (id SERIAL PRIMARY KEY, movie_id INT, episode_id INT, language VARCHAR, url TEXT);
CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username VARCHAR UNIQUE, email VARCHAR UNIQUE, password_hash TEXT, role VARCHAR DEFAULT 'user', avatar_url TEXT, created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE IF NOT EXISTS reviews (id SERIAL PRIMARY KEY, user_id INT, movie_id INT, rating INT, comment TEXT, created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE IF NOT EXISTS watch_history (id SERIAL PRIMARY KEY, user_id INT, movie_id INT, episode_id INT, watched_at TIMESTAMP DEFAULT NOW(), progress FLOAT);
CREATE TABLE IF NOT EXISTS ads (id SERIAL PRIMARY KEY, name VARCHAR, type VARCHAR, position VARCHAR, media_url TEXT, target_url TEXT, start_date DATE, end_date DATE, impressions INT DEFAULT 0, clicks INT DEFAULT 0, is_active BOOLEAN DEFAULT TRUE, created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE IF NOT EXISTS ad_logs (id SERIAL PRIMARY KEY, ad_id INT, user_id INT, event VARCHAR, created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE IF NOT EXISTS ad_placements (id SERIAL PRIMARY KEY, ad_id INT, page VARCHAR, slot VARCHAR);
CREATE TABLE IF NOT EXISTS daily_stats (id SERIAL PRIMARY KEY, date DATE UNIQUE, new_users INT DEFAULT 0, total_users INT DEFAULT 0, total_views INT DEFAULT 0, total_watch_time BIGINT DEFAULT 0, top_movie_id INT);

-- Seed
INSERT INTO countries(name) VALUES ('Vietnam') ON CONFLICT DO NOTHING;
INSERT INTO genres(name) VALUES ('Action'), ('Drama'), ('Sci-Fi') ON CONFLICT DO NOTHING;
INSERT INTO users(username,email,password_hash,role) VALUES ('admin','admin@example.com','$2a$10$8G71h3xwXy2pK1HjvZ9i5.OxB4i7D/.8ZzV0fUQ3iYkMZQF3xwq5u','admin') ON CONFLICT DO NOTHING;
INSERT INTO movies(title,slug,type) VALUES ('Bộ tứ siêu đẳng','bo-tu-sieu-dang','movie') ON CONFLICT DO NOTHING;
