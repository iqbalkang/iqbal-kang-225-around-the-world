CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name varchar(50) NOT NULL,
  last_name varchar(50),
  email varchar(255) NOT NULL UNIQUE,
  password text NOT NULL,
  about_me text,
  image text,
  image_id text,
  is_public boolean default false,
  created_at timestamp default NOW()
);

CREATE TABLE places (
  id SERIAL PRIMARY KEY,
  title varchar(100) NOT NULL,
  description text,
  address varchar NOT NULL,
  country varchar(30),
  rating decimal default 0,
  image text,
  small_image text,
  image_id text,
  lat real not null,
  lng real not null,
  user_id integer not null references users (id) on delete cascade
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  tag varchar,
  place_id integer not null references places (id) on delete cascade
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment text,
  created_at timestamp default now(),
  user_id integer not null references users (id) on delete cascade,
  place_id integer not null references places (id) on delete cascade,
  deleted boolean default(false)
);

CREATE TABLE mentions (
  id SERIAL PRIMARY KEY,
  created_at timestamp default now(),
  mentioned integer not null references users (id) on delete cascade,
  mentioned_by integer not null references users (id) on delete cascade,
  comment_id integer not null references comments (id) on delete cascade
);

CREATE TABLE replies (
  id SERIAL PRIMARY KEY not null,
  reply text,
  created_at timestamp default now(),
  comment_id integer not null references comments (id) on delete cascade,
  user_id integer not null references users (id) on delete cascade,
  deleted boolean default(false)
);

create table likes (
    id serial primary key not null,
    user_id integer not null references users (id) on delete cascade,
    place_id integer not null references places (id) on delete cascade,
    unique (user_id, place_id)
);

CREATE TABLE reactions (
  id serial primary key not null,
  type varchar not null,
  user_id integer not null references users (id) on delete cascade,
  comment_id integer not null references comments (id) on delete cascade
);

create type status as enum ('accepted', 'declined', 'pending');

CREATE TABLE followers (
  id serial primary key not null,
  status status,
  following_id integer not null references users (id) on delete cascade,
  follower_id integer not null references users (id) on delete cascade,
  unique (following_id, follower_id)
);


CREATE TABLE alerts (
  id serial primary key not null,
  alert_from integer not null references users (id) on delete cascade,
  alert_for integer not null references users (id) on delete cascade,
  place_id integer  references places (id) on delete cascade,
  comment_id integer  references comments (id) on delete cascade,
  text text,
  type varchar not null
)


