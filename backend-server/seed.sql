PRAGMA foreign_keys = OFF;

DELETE FROM bids;
DELETE FROM questions;
DELETE FROM item_categories;
DELETE FROM items;
DELETE FROM categories;
DELETE FROM users;

INSERT INTO users (user_id, first_name, last_name, email, password, salt) VALUES
(1,'Leonardo','Da Vinci','leo@art.com',
'95a51a5a5c51e8664b7b5053d292687c6cd86ae61db87b491c4024bfc2c70d049c9510a83e7cd5355e4f52b3442efcc230190a8f2fac88d62a94d5fa53767abed7a90fc99a578e634429abb6b03c289116d99758aaedeb15435ffcec9f641e07008fb6bbb6f6426ab3e77a37912f6236213f3458ee40a469f387a684bf176a881ec9733bff3eb67c987bb806d9c592e855917ed4d89dc4250fc4f405db85c71b1bcb5ebcef56e383f63bc6c60f6285bb9df2413b1687be1178a40a581938d9753dd1a7a992f48df8265157a7fefaecfb645f9efddb285415b8f62e297e176d1e9aeade48c4da58691d87b7ffeb773dde37f81753fd4b5a30d3fe39a6d71d3b96',
'0a1817cb52aa3a27ee36aea8f5215984eec7cc454da2732ef3952cd7db282fcf67f2abb06aa1d75f34cbc06c29dfe8a34b0de606ea78d1776e28279faa189339'),

(2,'Vincent','Van Gogh','vincent@art.com',
'95a51a5a5c51e8664b7b5053d292687c6cd86ae61db87b491c4024bfc2c70d049c9510a83e7cd5355e4f52b3442efcc230190a8f2fac88d62a94d5fa53767abed7a90fc99a578e634429abb6b03c289116d99758aaedeb15435ffcec9f641e07008fb6bbb6f6426ab3e77a37912f6236213f3458ee40a469f387a684bf176a881ec9733bff3eb67c987bb806d9c592e855917ed4d89dc4250fc4f405db85c71b1bcb5ebcef56e383f63bc6c60f6285bb9df2413b1687be1178a40a581938d9753dd1a7a992f48df8265157a7fefaecfb645f9efddb285415b8f62e297e176d1e9aeade48c4da58691d87b7ffeb773dde37f81753fd4b5a30d3fe39a6d71d3b96',
'0a1817cb52aa3a27ee36aea8f5215984eec7cc454da2732ef3952cd7db282fcf67f2abb06aa1d75f34cbc06c29dfe8a34b0de606ea78d1776e28279faa189339'),

(3,'Pablo','Picasso','pablo@art.com',
'95a51a5a5c51e8664b7b5053d292687c6cd86ae61db87b491c4024bfc2c70d049c9510a83e7cd5355e4f52b3442efcc230190a8f2fac88d62a94d5fa53767abed7a90fc99a578e634429abb6b03c289116d99758aaedeb15435ffcec9f641e07008fb6bbb6f6426ab3e77a37912f6236213f3458ee40a469f387a684bf176a881ec9733bff3eb67c987bb806d9c592e855917ed4d89dc4250fc4f405db85c71b1bcb5ebcef56e383f63bc6c60f6285bb9df2413b1687be1178a40a581938d9753dd1a7a992f48df8265157a7fefaecfb645f9efddb285415b8f62e297e176d1e9aeade48c4da58691d87b7ffeb773dde37f81753fd4b5a30d3fe39a6d71d3b96',
'0a1817cb52aa3a27ee36aea8f5215984eec7cc454da2732ef3952cd7db282fcf67f2abb06aa1d75f34cbc06c29dfe8a34b0de606ea78d1776e28279faa189339'),

(4,'Claude','Monet','claude@art.com',
'95a51a5a5c51e8664b7b5053d292687c6cd86ae61db87b491c4024bfc2c70d049c9510a83e7cd5355e4f52b3442efcc230190a8f2fac88d62a94d5fa53767abed7a90fc99a578e634429abb6b03c289116d99758aaedeb15435ffcec9f641e07008fb6bbb6f6426ab3e77a37912f6236213f3458ee40a469f387a684bf176a881ec9733bff3eb67c987bb806d9c592e855917ed4d89dc4250fc4f405db85c71b1bcb5ebcef56e383f63bc6c60f6285bb9df2413b1687be1178a40a581938d9753dd1a7a992f48df8265157a7fefaecfb645f9efddb285415b8f62e297e176d1e9aeade48c4da58691d87b7ffeb773dde37f81753fd4b5a30d3fe39a6d71d3b96',
'0a1817cb52aa3a27ee36aea8f5215984eec7cc454da2732ef3952cd7db282fcf67f2abb06aa1d75f34cbc06c29dfe8a34b0de606ea78d1776e28279faa189339'),

(5,'Frida','Kahlo','frida@art.com',
'95a51a5a5c51e8664b7b5053d292687c6cd86ae61db87b491c4024bfc2c70d049c9510a83e7cd5355e4f52b3442efcc230190a8f2fac88d62a94d5fa53767abed7a90fc99a578e634429abb6b03c289116d99758aaedeb15435ffcec9f641e07008fb6bbb6f6426ab3e77a37912f6236213f3458ee40a469f387a684bf176a881ec9733bff3eb67c987bb806d9c592e855917ed4d89dc4250fc4f405db85c71b1bcb5ebcef56e383f63bc6c60f6285bb9df2413b1687be1178a40a581938d9753dd1a7a992f48df8265157a7fefaecfb645f9efddb285415b8f62e297e176d1e9aeade48c4da58691d87b7ffeb773dde37f81753fd4b5a30d3fe39a6d71d3b96',
'0a1817cb52aa3a27ee36aea8f5215984eec7cc454da2732ef3952cd7db282fcf67f2abb06aa1d75f34cbc06c29dfe8a34b0de606ea78d1776e28279faa189339');

UPDATE users SET
password = (SELECT password FROM users WHERE user_id = 1),
salt     = (SELECT salt FROM users WHERE user_id = 1)
WHERE user_id > 1;

INSERT INTO categories (category_id, name) VALUES
(1,'Renaissance'),
(2,'Impressionism'),
(3,'Modern'),
(4,'Abstract'),
(5,'Baroque');

INSERT INTO items (item_id, name, description, starting_bid, start_date, end_date, creator_id, image_url) VALUES
-- Leonardo (1)
(1,'Mona Lisa','Portrait',100000,strftime('%s','now')-86400,strftime('%s','now')+5184000,1,'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/330px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg'),
(2,'Vitruvian Man','Sketch',50000,strftime('%s','now')-86400,strftime('%s','now')+5184000,1,'https://mymodernmet.com/wp/wp-content/uploads/2018/08/leonardo-da-vinci-vitruvian-man-2.jpg'),
(3,'The Last Supper','Mural',150000,strftime('%s','now')-86400,strftime('%s','now')+86400,1,'https://cdn-imgix.headout.com/tour/16035/TOUR-IMAGE/c7f9ec0b-144f-45fa-87ce-5b6b3ac0a304-8893-milan-historical-tour-of-milan-and-the-last-supper-09.jpg?auto=format&q=90&crop=faces&fit=crop'),
(4,'Flying Machine','Concept',20000,strftime('%s','now')-604800,strftime('%s','now')-86400,1,'https://www.leonardodavinci.net/assets/img/works/design-for-a-flying-machine2.jpg'),
(5,'Anatomy Study','Drawing',30000,strftime('%s','now')-604800,strftime('%s','now')-172800,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS72GTZvh_sXu4CdO20PDa2Obo2hLG76RNDc2eE6KVSkoIX-VHGpN9HvevDMAnSPu47vvYsB0HnpZBs8jSqREgMahKr8YnpYWH2KH-3XEI&s=10'),

-- Vincent (2)
(6,'Starry Night','Landscape',80000,strftime('%s','now')-86400,strftime('%s','now')+5184000,2,'https://www.guarcholga.es/wp-content/uploads/2021/07/58-starry-night-indigo.jpg'),
(7,'Sunflowers','Still Life',70000,strftime('%s','now')-86400,strftime('%s','now')+5184000,2,'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/960px-Vincent_Willem_van_Gogh_127.jpg'),
(8,'Cafe Terrace','Cityscape',65000,strftime('%s','now')-86400,strftime('%s','now')+86400,2,'https://upload.wikimedia.org/wikipedia/commons/b/b0/Vincent_van_Gogh_%281853-1890%29_Caf%C3%A9terras_bij_nacht_%28place_du_Forum%29_Kr%C3%B6ller-M%C3%BCller_Museum_Otterlo_23-8-2016_13-35-40.JPG'),
(9,'Self Portrait','Portrait',50000,strftime('%s','now')-604800,strftime('%s','now')-86400,2,'https://upload.wikimedia.org/wikipedia/commons/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg'),
(10,'Wheatfield','Landscape',60000,strftime('%s','now')-604800,strftime('%s','now')-172800,2,'https://upload.wikimedia.org/wikipedia/commons/c/ce/Wheat-Field-with-Cypresses-%281889%29-Vincent-van-Gogh-Met.jpg'),

-- Pablo (3)
(11,'Guernica','War',120000,strftime('%s','now')-86400,strftime('%s','now')+5184000,3,'https://cdn.britannica.com/79/91479-050-24F98E12/Guernica-canvas-Pablo-Picasso-Madrid-Museo-Nacional-1937.jpg?w=400&h=300&c=crop'),
(12,'Les Demoiselles','Modern',90000,strftime('%s','now')-86400,strftime('%s','now')+5184000,3,'https://upload.wikimedia.org/wikipedia/en/4/4c/Les_Demoiselles_d%27Avignon.jpg'),
(13,'Weeping Woman','Portrait',75000,strftime('%s','now')-86400,strftime('%s','now')+86400,3,'https://media.tate.org.uk/art/images/work/T/T05/T05010_9.jpg'),
(14,'Bull Fight','Sketch',30000,strftime('%s','now')-604800,strftime('%s','now')-86400,3,'https://www.museothyssen.org/sites/default/files/imagen/2019-10/PICASSO%2C%20Pablo%20Ruiz_Corrida%20de%20toros_706%20%281976.83%29_FOTOH%20%23F21.jpg'),
(15,'Cubist Study','Abstract',35000,strftime('%s','now')-604800,strftime('%s','now')-172800,3,'https://www.pablopicasso.org/assets/img/paintings/girl-with-mandolin.jpg'),

-- Claude (4)
(16,'Water Lilies','Landscape',60000,strftime('%s','now')-86400,strftime('%s','now')+5184000,4,'https://collectionapi.metmuseum.org/api/collection/v1/iiif/437127/2331256/restricted'),
(17,'Impression Sunrise','Harbour',70000,strftime('%s','now')-86400,strftime('%s','now')+5184000,4,'https://upload.wikimedia.org/wikipedia/commons/5/59/Monet_-_Impression%2C_Sunrise.jpg'),
(18,'Haystacks','Field',55000,strftime('%s','now')-86400,strftime('%s','now')+86400,4,'https://upload.wikimedia.org/wikipedia/commons/6/68/Claude_Monet_-_Stacks_of_Wheat_%28End_of_Summer%29_-_1985.1103_-_Art_Institute_of_Chicago.jpg'),
(19,'Garden','Nature',40000,strftime('%s','now')-604800,strftime('%s','now')-86400,4,'https://giverny.org/gardens/fcm/giverny.jpg'),
(20,'Seine Study','River',42000,strftime('%s','now')-604800,strftime('%s','now')-172800,4,'https://uploads2.wikiart.org/images/claude-monet/sea-study.jpg!Large.jpg'),

-- Frida (5)
(21,'The Two Fridas','Portrait',85000,strftime('%s','now')-86400,strftime('%s','now')+5184000,5,'https://www.fridakahlo.org/assets/img/paintings/the-two-fridas.jpg'),
(22,'Self Portrait Thorn','Symbolic',80000,strftime('%s','now')-86400,strftime('%s','now')+5184000,5,'https://upload.wikimedia.org/wikipedia/en/1/1e/Frida_Kahlo_%28self_portrait%29.jpg'),
(23,'Broken Column','Surreal',78000,strftime('%s','now')-86400,strftime('%s','now')+86400,5,'https://substackcdn.com/image/fetch/$s_!t8zj!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F982f10c2-b1bd-4083-a294-fdd718d1d4b7_1014x1320.png'),
(24,'Still Life','Study',30000,strftime('%s','now')-604800,strftime('%s','now')-86400,5,'https://uploads4.wikiart.org/images/magdalena-carmen-frieda-kahlo-y-calder%C3%B3n-de-rivera/still-life-with-parrot-1951.jpg!Large.jpg'),
(25,'Sketchbook','Drawing',25000,strftime('%s','now')-604800,strftime('%s','now')-172800,5,'https://emilysnotebook.co.uk/wp-content/uploads/2021/05/FK1-scaled.jpg');

INSERT INTO item_categories VALUES
-- Leo (Renaissance + some Baroque)
(1,1),(2,1),(3,1),(4,1),(5,1),
(3,5),(4,5),

-- Vincent (Impressionism)
(6,2),(7,2),(8,2),(9,2),(10,2),

-- Pablo (Modern + Abstract)
(11,3),(12,3),(13,3),
(13,4),(14,3),(15,4),

-- Claude (Impressionism)
(16,2),(17,2),(18,2),(19,2),(20,2),

-- Frida (Modern + Abstract)
(21,4),(22,4),(23,3),(23,4),(24,3),(25,4);

INSERT INTO bids VALUES
(1,2,110000,strftime('%s','now')-3000),
(1,3,125000,strftime('%s','now')-2500),
(6,1,90000,strftime('%s','now')-2000),
(11,4,130000,strftime('%s','now')-1800),
(16,5,70000,strftime('%s','now')-1600),
(21,2,88000,strftime('%s','now')-1400),
(3,5,155000,strftime('%s','now')-1200),
(8,4,72000,strftime('%s','now')-1000),
(13,1,82000,strftime('%s','now')-900),
(18,3,60000,strftime('%s','now')-800),
(23,2,81000,strftime('%s','now')-700),
(17,5,75000,strftime('%s','now')-600),

(1,4,135000,strftime('%s','now')-5200),
(1,5,142000,strftime('%s','now')-4800),
(1,2,150000,strftime('%s','now')-4200),
(2,3,60000,strftime('%s','now')-4100),
(2,4,64000,strftime('%s','now')-3800),
(2,5,69000,strftime('%s','now')-3600),
(3,2,160000,strftime('%s','now')-3500),
(3,3,168000,strftime('%s','now')-3300),
(4,2,23000,strftime('%s','now')-90000),
(4,3,26000,strftime('%s','now')-88000),
(5,4,32000,strftime('%s','now')-92000),

(6,3,95000,strftime('%s','now')-2600),
(6,4,100000,strftime('%s','now')-2400),
(7,1,76000,strftime('%s','now')-2200),
(7,5,82000,strftime('%s','now')-2100),
(8,1,74000,strftime('%s','now')-1500),
(8,3,79000,strftime('%s','now')-1400),

(11,1,140000,strftime('%s','now')-2000),
(11,2,155000,strftime('%s','now')-1700),
(12,4,98000,strftime('%s','now')-1600),
(12,5,105000,strftime('%s','now')-1500),
(13,2,84000,strftime('%s','now')-800),
(13,4,90000,strftime('%s','now')-650),

(16,1,76000,strftime('%s','now')-1200),
(16,2,81000,strftime('%s','now')-1100),
(17,2,78000,strftime('%s','now')-900),
(17,3,83000,strftime('%s','now')-850),
(18,5,64000,strftime('%s','now')-760),

(21,3,91000,strftime('%s','now')-1300),
(21,4,96000,strftime('%s','now')-1100),
(22,2,85000,strftime('%s','now')-1000),
(22,1,90000,strftime('%s','now')-900),
(23,4,86000,strftime('%s','now')-680);

INSERT INTO questions (question, answer, asked_by, item_id) VALUES
('Is this authenticated?','Yes, with full provenance.',2,1),
('Any restoration done?',NULL,3,1),
('Can I view in person?','Yes by appointment.',4,6),
('Is framing included?',NULL,5,6),
('What condition is it in?','Excellent.',1,11),
('Any damage?','Minor age wear.',2,11),
('Is shipping insured?',NULL,3,16),
('Is this signed?','Yes.',4,21),
('Can I see more photos?',NULL,1,21),
('Is this original canvas?','Yes.',5,3),
('Is there reserve price?',NULL,2,18),
('Any certificates?','Provided.',3,23),
('Is there a certificate of authenticity included?',NULL,4,1),
('Do you provide a condition report?',NULL,5,1),
('Can you confirm the medium and support?',NULL,2,1),
('Has this undergone any cleaning in the last 50 years?','No recent cleaning recorded.',3,1),
('Is the frame included in the sale?',NULL,4,1),
('Can you share provenance chain details?',NULL,5,1),
('Is this a direct scan from the original?',NULL,2,2),
('Any known tears or paper restoration?','None known.',4,2),
('Will it be shipped flat or rolled?',NULL,5,2),
('Can you provide high-res closeups of the text/annotations?',NULL,3,2),
('Can I book a private viewing slot?',NULL,2,3),
('Does the listing include any viewing restrictions?',NULL,4,3),
('Any documentation on previous exhibition history?','Yes, summary available on request.',5,3),
('Is climate-controlled transport available?',NULL,3,3),
('Why did this auction end early?',NULL,2,4),
('Was this ever reconstructed from fragments?',NULL,3,4),
('Any anatomical notes included with it?',NULL,4,5),
('Is the paper brittleness an issue?',NULL,5,5),
('Is the varnish modern or original?',NULL,1,6),
('Can you confirm the canvas dimensions?',NULL,3,6),
('Any visible cracking in the paint layer?','Minor expected craquelure.',4,7),
('Can you provide a shipping estimate to the UK?',NULL,5,8),
('Is this mounted or unmounted?',NULL,1,9),
('Is there any gallery documentation?','Yes, provided to winning bidder.',2,11),
('Can you confirm if this is a study or final work?',NULL,4,12),
('Any signature or mark on the reverse?',NULL,5,13),
('Was the work professionally framed?','Yes.',1,13),
('Are there any loan restrictions for exhibitions?',NULL,2,12),
('Can you confirm the year of creation?',NULL,1,16),
('Is this from the same series as other lilies works?','Yes, it is part of the broader series.',2,16),
('Any pigment fading visible?',NULL,3,17),
('Is there a reserve price?','No reserve on this lot.',5,17),
('Can I see provenance documents before bidding?',NULL,4,18),
('Does the work include any certificates?',NULL,2,21),
('Any restoration done on the canvas?',NULL,3,22),
('Is the frame included?',NULL,4,22),
('Can you confirm if this is oil or mixed media?',NULL,1,23),
('Is insured shipping included?','Yes, insured shipping is included.',5,23);

PRAGMA foreign_keys = ON;
