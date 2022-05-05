const initialState = {
  parkCollection: [
    {
      id: 'My Best Friend\'s Park',
      name: 'My Best Friend\'s Park',
      featured_image: 'https://klydewarrenpark.imgix.net/dogparkcropped.jpg?q=65&fit=crop&crop=faces,entropy,center&fm=jpeg&auto=format&w=412&h=278',
      dogs: [],
      neighborhood: 'Downtown',
    },
    {
      id: 'White Rock Lake Park',
      name: 'White Rock Lake Park',
      featured_image: 'https://lakehighlands.advocatemag.com/wp-content/uploads/sites/10/2018/09/1504290007_DannyFulgencio_AerialWhiteRockLake_ED_63.jpg',
      dogs: [],
      neighborhood: 'Lakewood',
    },
    {
      id: 'Central Commons Community Park',
      name: 'Central Commons Community Park',
      featured_image: 'https://www.papercitymag.com/wp-content/uploads/2020/07/Uptown2-Griggs-park.jpg',
      address: '4711 Westside Dr, Dallas, TX 75209',
      dogs: [],
      neighborhood: 'South Oak',
    },
    {
      id: 'Main Street Park',
      name: 'Main Street Park',
      featured_image: 'https://parksfordowntowndallas.org/wp-content/uploads/2019/04/May-2-Blog.png',
      dogs: [],
      neighborhood: 'Downtown',
    },
    {
      id: 'Mutts',
      name: 'Mutts',
      featured_image: 'https://bloximages.newyork1.vip.townnews.com/franchisetimes.com/content/tncms/assets/v3/editorial/f/28/f287df0e-e678-11eb-a5fe-97667888c578/60f1f3966c2a6.image.jpg?resize=750%2C500',
      dogs: [],
      neighborhood: 'West Village',
    },
    {
      id: 'Bark Park Central',
      name: 'Bark Park Central',
      featured_image: 'https://www.deepellumtexas.com/wp-content/uploads/bg-community-projects-bark-park-sm-min.jpg',
      dogs: [],
      neighborhood: 'Deep Ellum',
    },
  ],
  myParks: [],
};

const ParkCollection = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PARK_BY_ID':
      return {
        ...state,
        parkCollection: state.parkCollection.filter(park => park.id === action.parkId),
      };
    case 'ADD_PARK':
      return {
        ...state,
        parkCollection: [...state.parkCollection, action.park],
      };
    case 'CHECK_IN_AT_PARK':
      // Add timestamp to dog
      action.dog.timestamp = action.timestamp;
      action.dog.expires = new Date(action.timestamp + 1800000).getTime();
      return {
        ...state,
        parkCollection: state.parkCollection.map(park => {
          if (park.id === action.park.id) {
            return {
              ...park,
              // Update the array of dogs at the park
              dogs: [...park.dogs, action.dog],
            };
          }
          return park;
        })
      }
    case 'REMOVE_DOG_FROM_PARK':
      return {
        ...state,
        parkCollection: state.parkCollection.map(park => {
          if (park.id === action.parkId) {
            return {
              ...park,
              // Update the array of dogs at the park
              dogs: park.dogs.filter(dog => dog.id !== action.dogId),
            };
          }
          return park;
        })
      }
    case 'ADD_PARK_TO_MY_PARKS':
      return {
        ...state,
        myParks: [...state.myParks, action.park],
      };
    case 'REMOVE_PARK':
      // Remove by index in the array
      return {
        ...state,
        parkCollection: [
          ...state.parkCollection.slice(0, action.index),
          ...state.parkCollection.slice(action.index + 1),
        ],
      };
    default:
      return state;
  }
}

export default ParkCollection;