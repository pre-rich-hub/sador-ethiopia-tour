/** Traveller reviews from sadorethiopiatours.com, lightly copy-edited for typos. */
export interface Testimonial {
  name: string
  country: string
  lang: 'en' | 'es'
  quote: string
  trip?: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Betsy B.',
    country: 'USA',
    lang: 'en',
    trip: 'Private tour',
    quote:
      'What an absolutely amazing tour of Ethiopia we had with Sisay through Sador Ethiopia Tours! He had everything organized beautifully — we just arrived in the country and he did the rest. It was pure joy and no stress. We saw so many incredible sights and learned so much about Ethiopian history and culture. You won’t be disappointed!',
  },
  {
    name: 'Gabriela',
    country: 'Argentina',
    lang: 'en',
    trip: '10-day group journey',
    quote:
      'I took a group to Ethiopia and Sisay was our guide for the whole ten days. His English is excellent, he was always attentive to our comfort, and his knowledge of the history and geography of his country enriched our adventure. We will return next year with him and his team to keep discovering the cradle of humanity!',
  },
  {
    name: 'Jessica P.',
    country: 'USA',
    lang: 'en',
    trip: 'Family meeting trip',
    quote:
      'My daughter and I travelled to Ethiopia so she could see the country of her birth and meet the family who hadn’t seen her in sixteen years. Sisay navigated the whole trip with ease and understanding — he translated for us and spent hours in her family’s homes. We are beyond thankful for this unforgettable trip.',
  },
  {
    name: 'Pablo S.',
    country: 'Argentina',
    lang: 'en',
    trip: 'Omo Valley',
    quote:
      'An excellent guide and an exceptional human being. From the first moment he greeted us with a smile at Addis Ababa airport, every metre of this blessed land was amazing. He guided us among the tribes of the Omo Valley, translating from the local languages, and with him we felt like family — safe, protected and cared for.',
  },
  {
    name: 'Chris J.',
    country: 'USA',
    lang: 'en',
    trip: 'Humanitarian & cultural trip',
    quote:
      'Sisay provided our humanitarian team with a rich cultural, sightseeing and humanitarian experience. He handled complex coordination with grace, and the itinerary he designed had flexibility built in. I would highly recommend Sador Ethiopia Tours for your next trip to Ethiopia!',
  },
  {
    name: 'Georgios',
    country: 'Greece',
    lang: 'en',
    quote:
      'A very professional guide with huge knowledge and experience. We had a meticulously detailed, well-prepared plan, and Sisay made every moment of our trip special and unique. We highly recommend his services.',
  },
  {
    name: 'Kelley',
    country: 'USA',
    lang: 'en',
    trip: 'Family search & reunion',
    quote:
      'Sisay is a caring, hard-working and ethical man who helps adoptive families around the world and their Ethiopian-born children connect with birth family and culture. His services are a real gift to both families — and especially to the children, so they can keep their Ethiopian culture and connection alive.',
  },
  {
    name: 'Maria G.',
    country: 'USA',
    lang: 'en',
    quote:
      'Sisay was a true professional and a delight to work with. His communication before our trip was excellent, and he was a pro at navigating Addis traffic. Nine of us travelled for this humanitarian and cultural experience and he ensured we had a safe and fun journey.',
  },
  {
    name: 'Vatter',
    country: 'Italy',
    lang: 'en',
    trip: '15 days · family meeting',
    quote:
      'We went to Ethiopia to meet the biological mother of our adopted son. Sisay organised our fifteen days perfectly — from the moment we arrived in Addis Ababa we didn’t have to worry about anything. Sisay is number one if you want to visit Ethiopia!',
  },
  {
    name: 'Leonardo',
    country: 'Argentina',
    lang: 'en',
    quote:
      'I want to stress the willingness and kindness of everyone at this company. They solved every small difficulty of travelling from Argentina to Ethiopia, and welcomed us with a warmth that goes far beyond simply offering a service. Grateful forever.',
  },
  {
    name: 'Gloria',
    country: 'Argentina',
    lang: 'en',
    quote:
      'Excellent guide! He knows a lot about Ethiopia — very professional, helpful, and quick to solve problems. A very serious agency. I fully recommend him.',
  },
  {
    name: 'Gonzalo',
    country: 'Argentina',
    lang: 'en',
    quote: 'Tremendous — everything was amazing! Everything went perfectly: the attention, the organisation and above all the willingness. Thank you, Sisay!',
  },
  {
    name: 'Nacho Moro',
    country: 'España',
    lang: 'es',
    trip: 'Walking tour · Addis Ababa',
    quote:
      'Hicimos un walking tour por Addis con Sador Ethiopia Tours, incluyendo el Museo Nacional y la Catedral de San Jorge. Sisay nos llevó por las zonas más importantes y también por rincones menos conocidos, siempre velando por nuestra seguridad y atendiendo nuestros intereses. Una experiencia que no olvidaremos.',
  },
  {
    name: 'Montse',
    country: 'España',
    lang: 'es',
    trip: 'Sur de Etiopía',
    quote:
      'Un grupo de familiares y amigos viajamos al sur de Etiopía con Sisay. Nos enseñó sus tribus, todo un espectáculo de color, y sus parques naturales con gran variedad de animales. Buscaba siempre lo mejor para que tuviéramos el viaje de nuestros sueños, y en eso se convirtió.',
  },
  {
    name: 'Raúl P.',
    country: 'España',
    lang: 'es',
    quote:
      'Sisay es un gran conocedor de su país, sabe moverse por todos los sitios y hace que puedas aprovechar mucho más el viaje. Muy agradable su compañía y con mucho don de gentes.',
  },
  {
    name: 'Nati & Iván',
    country: 'España',
    lang: 'es',
    quote:
      'Conocimos a Sisay por referencias de unos amigos. Visitamos patrimonio cultural y natural — la iglesia de San Jorge, el monte Entoto — y estuvimos en todo momento muy atendidos. Es un encanto de persona, disfruta ejerciendo de anfitrión y eso se nota.',
  },
]
