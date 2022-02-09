INSERT INTO users (name, email, password) VALUES ('Erica Jensen', 'erica_j@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Kaoru Nagayama', 'k_nagayama@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('April Gibson', 'i_love_cats@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Andrew Lloyd', 'andy_l@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('John Waller', 'waller@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');



INSERT INTO properties (owner_id, title, description,thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (1, 'Sunset villa', 'description', 'http://www.sunset_villa.com', 'https://picsum.photos/200', 120, 5, 2, 4, 'Canada', 'sunset', 'Collingwood', 'Ontario', '1A2D5G', TRUE );
INSERT INTO properties (owner_id, title, description,thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (2, 'Garden apartment', 'description','http://www.garden_apartment.com', 'https://picsum.photos/200', 150, 1, 1, 2, 'Canada', 'Gorge', 'Victoria', 'British Columbia', '3I8H0F', TRUE );
INSERT INTO properties (owner_id, title, description,thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (3, 'Park house', 'description','http://www.park_h.com', 'https://picsum.photos/200', 80, 0, 1, 1, 'Canada', 'park', 'Toronto', 'Ontario', '9G1B6J', FALSE );
INSERT INTO properties (owner_id, title, description,thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (4, 'lake house', 'description','http://www.lake.com', 'https://picsum.photos/200', 100, 2, 1, 2, 'Canada', 'dixie', 'Invermere', 'British Columbia', '9H9S4F', TRUE );


INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 4, '2021-10-01', '2021-10-14');
INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (4, 4, '2019-09-11', '2019-09-26'),
(5, 2, '2020-08-04', '2020-08-10');
INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (2, 4, '2017-09-11', '2017-09-26');


INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 3, 'It was okay');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 2, 2, 5, 'Very close to downtown! Spotless clean :)');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (5, 4, 4, 4, 'Enjoy the scenery from my room');