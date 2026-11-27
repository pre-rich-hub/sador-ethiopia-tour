export type RegionSlug =
  | 'addis-ababa'
  | 'historic-north'
  | 'cultural-south'
  | 'eastern-ethiopia'
  | 'afar'
  | 'coffee-route'
  | 'eco-villages'

export interface Region {
  slug: RegionSlug
  name: string
  short: string
  tagline: string
  intro: string[]
  image: string
  /** Tour categories that belong to this region, used to surface journeys. */
  tourRegion: string
}

export const regions: Region[] = [
  {
    slug: 'historic-north',
    name: 'Historic North',
    short: 'Historic North',
    tagline: 'Obelisks, castles and churches carved from living rock',
    intro: [
      'Ethiopia’s Historic Route is one of the great journeys of Africa. In Axum stand the carved obelisks of a kingdom that traded with Rome and is said to guard the Ark of the Covenant. Gondar’s 17th-century castles earned it the name “Camelot of Africa”, and in Lalibela eleven medieval churches were hewn down into the red volcanic rock.',
      'Between them lie the island monasteries of Lake Tana, the thundering Blue Nile Falls, the cliff-top churches of Gheralta, the ancient mosque at Negash — and the jagged escarpments of the Simien Mountains, home of the gelada baboon.',
    ],
    image: 'lalibela-bete-giorgis',
    tourRegion: 'historic-north',
  },
  {
    slug: 'cultural-south',
    name: 'Cultural South',
    short: 'Cultural South',
    tagline: 'The Rift Valley lakes and the peoples of the Omo',
    intro: [
      'The Great Rift Valley carries a chain of lakes south towards Kenya, and with it some of the most diverse cultures on the continent. The Dorze are famed for their cotton weaving and beehive-shaped houses; the Konso have terraced their steep hills for centuries.',
      'Along the Omo River live the Hamar, Karo, Mursi, Dassanech, Nyangatom and many more — peoples whose body art, markets and ceremonies make the Lower Omo one of Ethiopia’s UNESCO World Heritage Sites.',
    ],
    image: 'omo-hamar-women',
    tourRegion: 'cultural-south',
  },
  {
    slug: 'addis-ababa',
    name: 'Addis Ababa & Surroundings',
    short: 'Addis Ababa',
    tagline: 'The “New Flower” — capital of Africa’s diplomacy',
    intro: [
      'Founded in 1886 by Empress Taytu and Emperor Menelik II, Addis Ababa — “New Flower” — sits at 2,355 metres with a mild climate all year round. Today it is home to the African Union and one of the largest diplomatic communities in the world.',
      'The city mixes historic churches, mosques and museums — Lucy among them — with new parks, stylish cafés and a famous live-music scene. Within a day’s drive lie crater lakes, ancient stelae, rock-hewn churches and cool highland forests.',
    ],
    image: 'addis-skyline-aerial',
    tourRegion: 'addis-ababa',
  },
  {
    slug: 'eastern-ethiopia',
    name: 'Eastern Ethiopia',
    short: 'Eastern Ethiopia',
    tagline: 'Walled Harar, desert railways and the Bale highlands',
    intro: [
      'Eastern Ethiopia is a land of contrasts. The walled city of Harar — a UNESCO World Heritage Site and one of Islam’s holiest cities — is a maze of alleys, shrines and markets where hyenas are still hand-fed each night.',
      'Nearby Dire Dawa grew up around the Ethio-Djibouti railway, the Babile sanctuary shelters a rare population of elephants, and to the south-west the Bale Mountains rise to the Afro-alpine Sanetti Plateau, home of the Ethiopian wolf.',
    ],
    image: 'harar-gate',
    tourRegion: 'eastern-ethiopia',
  },
  {
    slug: 'afar',
    name: 'Afar Region & Desert Expeditions',
    short: 'Afar & Danakil',
    tagline: 'Lava lakes, salt flats and the cradle of humankind',
    intro: [
      'The Afar Region holds some of the most extraordinary landscapes on earth. In the Danakil Depression, more than 100 metres below sea level, salt caravans still cross the flats of Lake Asale, the sulphur springs of Dallol glow yellow and green, and the lava lake of Erta Ale churns in its crater.',
      'This is also where our story begins: at Hadar, in the Lower Awash Valley, the 3.2-million-year-old skeleton of “Lucy” was discovered. Awash National Park and the hot springs of Doho and Allolabad complete the region.',
    ],
    image: 'danakil-erta-ale',
    tourRegion: 'afar',
  },
  {
    slug: 'coffee-route',
    name: 'Coffee Route & Western Ethiopia',
    short: 'Coffee Route',
    tagline: 'Wild coffee forests where it all began',
    intro: [
      'Coffee was born in the forests of south-western Ethiopia. In the Kafa Biosphere Reserve — the region that gave coffee its name — wild Arabica still grows beneath the canopy, and a cup of coffee shared in a village ceremony is a welcome like no other.',
      'Jimma, once the seat of a powerful Oromo kingdom, is the gateway to the region. Beyond lie the elephant forests of Chebera Churchura and the wetlands of Gambella National Park, among the least visited wild places in Africa.',
    ],
    image: 'jimma',
    tourRegion: 'coffee-route',
  },
  {
    slug: 'eco-villages',
    name: 'Best Tourism Villages',
    short: 'Eco Villages',
    tagline: 'Community-led eco-tourism, recognised worldwide',
    intro: [
      'Three Ethiopian villages have been recognised by the UN Tourism “Best Tourism Villages” programme for community-led, sustainable tourism: Lephis, Wenchi-Dendi and the Choke Mountains.',
      'From the waterfalls of Lephis to the crater lake of Wenchi and the alpine wetlands of Choke, each invites you to walk, ride and stay with local families — and every visit supports the people and landscapes that make them special.',
    ],
    image: 'wenchi-crater',
    tourRegion: 'eco-villages',
  },
]

