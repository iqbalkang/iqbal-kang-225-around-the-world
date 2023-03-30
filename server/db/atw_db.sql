CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name varchar(50) NOT NULL,
  last_name varchar(50)
  email varchar(255) NOT NULL UNIQUE,
  password text NOT NULL,
  about_me text,
  image text,
  image_id text,
  created_at timestamp
)

CREATE TABLE places (
  id SERIAL PRIMARY KEY,
  title varchar(50) NOT NULL,
  description text,
  address varchar(50) NOT NULL,
  country varchar(20),
  rating decimal,
  image text,
  image_id text,
  lat real,
  lng real,
  user_id integer not null references users (id)
)

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  place_id integer not null references places (id)
)

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment text,
  created_at timestamp,
  user_id integer not null references users (id),
  place_id integer not null references places (id),
  deleted boolean default(false)
)

create table likes (
    id serial primary key not null,
    user_id integer not null references users (id),
    place_id integer not null references places (id),
    unique (user_id, place_id)
)

CREATE TABLE emojis (
  id serial primary key not null,
  type char
)

CREATE TABLE reactions (
  id serial primary key not null,
  emoji_id integer not null references emojis (id), 
  user_id integer not null references users (id),
  comment_id integer not null references comments (id)
)

CREATE TABLE followers (
  id serial primary key not null,
  following_id integer not null references users (id),
  follower_id integer not null references users (id)
)

CREATE TABLE replies (
  id SERIAL PRIMARY KEY not null,
  reply text,
  created_at timestamp,
  comment_id integer not null references comments (id),
  user_id integer not null references users (id),
  deleted boolean default(false)
)
