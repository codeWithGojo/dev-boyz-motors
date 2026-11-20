import { referencePhotos } from './reference-photos'

export type Car = {
  id: string
  slug: string
  brand: string
  model: string
  year: number
  condition: 'Brand new' | 'Foreign used' | 'Nigerian used'
  price: number
  mileage: number
  transmission: string
  engine: string
  fuel: string
  bodyType: string
  colour: string
  status: string
  negotiable: boolean
  dutyCleared: boolean
  instalmentMonthly?: number
  featured?: boolean
  newArrival?: boolean
  images: string[]
  photoSources: string[]
}

const seedCars: Omit<Car,'photoSources'>[] = [
  {id:'1',slug:'mercedes-amg-gle-63-s-coupe-2024',brand:'Mercedes-AMG',model:'GLE 63 S Coupe',year:2024,condition:'Brand new',price:285000000,mileage:0,transmission:'Automatic',engine:'4.0L V8 Biturbo',fuel:'Petrol',bodyType:'SUV',colour:'Selenite Grey',status:'Sample model',negotiable:true,dutyCleared:true,featured:true,newArrival:true,images:[]},
  {id:'2',slug:'mercedes-amg-glc-43-coupe-2024',brand:'Mercedes-AMG',model:'GLC 43 Coupe',year:2024,condition:'Brand new',price:138000000,mileage:0,transmission:'Automatic',engine:'2.0L Turbo Hybrid',fuel:'Petrol',bodyType:'Coupe',colour:'White',status:'Sample model',negotiable:true,dutyCleared:true,featured:true,newArrival:true,images:[]},
  {id:'3',slug:'mercedes-amg-glc-63-s-coupe-2019',brand:'Mercedes-AMG',model:'GLC 63 S Coupe',year:2019,condition:'Foreign used',price:92000000,mileage:31200,transmission:'Automatic',engine:'4.0L V8 Biturbo',fuel:'Petrol',bodyType:'Coupe',colour:'Graphite Grey',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'4',slug:'mercedes-amg-gt-53-4-door-2020',brand:'Mercedes-AMG',model:'GT 53 4-Door',year:2020,condition:'Foreign used',price:120000000,mileage:27400,transmission:'Automatic',engine:'3.0L I6 Turbo',fuel:'Petrol',bodyType:'Coupe',colour:'Obsidian Black',status:'Sample model',negotiable:true,dutyCleared:true,instalmentMonthly:5000000,images:[]},
  {id:'5',slug:'lamborghini-urus-2022',brand:'Lamborghini',model:'Urus',year:2022,condition:'Foreign used',price:390000000,mileage:12700,transmission:'Automatic',engine:'4.0L V8 Biturbo',fuel:'Petrol',bodyType:'SUV',colour:'Viola',status:'Sample model',negotiable:true,dutyCleared:true,featured:true,images:[]},
  {id:'6',slug:'range-rover-autobiography-2023',brand:'Range Rover',model:'Autobiography',year:2023,condition:'Foreign used',price:260000000,mileage:16900,transmission:'Automatic',engine:'4.4L V8',fuel:'Petrol',bodyType:'SUV',colour:'Santorini Black',status:'Sample model',negotiable:true,dutyCleared:true,featured:true,images:[]},
  {id:'7',slug:'lexus-is-500-f-sport-performance-2023',brand:'Lexus',model:'IS 500 F Sport Performance',year:2023,condition:'Brand new',price:98000000,mileage:0,transmission:'Automatic',engine:'5.0L V8',fuel:'Petrol',bodyType:'Sedan',colour:'Molten Pearl',status:'Sample model',negotiable:true,dutyCleared:true,featured:true,images:[]},
  {id:'8',slug:'lexus-is-350-f-sport-2022-18200',brand:'Lexus',model:'IS 350 F Sport',year:2022,condition:'Foreign used',price:64000000,mileage:18200,transmission:'Automatic',engine:'3.5L V6',fuel:'Petrol',bodyType:'Sedan',colour:'Caviar Black',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'9',slug:'lexus-is-350-f-sport-2022-15600',brand:'Lexus',model:'IS 350 F Sport',year:2022,condition:'Foreign used',price:66000000,mileage:15600,transmission:'Automatic',engine:'3.5L V6',fuel:'Petrol',bodyType:'Sedan',colour:'Cloudburst Grey',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'10',slug:'lexus-rx-350-2017',brand:'Lexus',model:'RX 350',year:2017,condition:'Foreign used',price:38000000,mileage:56100,transmission:'Automatic',engine:'3.5L V6',fuel:'Petrol',bodyType:'SUV',colour:'Black',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'11',slug:'toyota-venza-v6-2011',brand:'Toyota',model:'Venza V6',year:2011,condition:'Nigerian used',price:9500000,mileage:101000,transmission:'Automatic',engine:'3.5L V6',fuel:'Petrol',bodyType:'Crossover',colour:'Black',status:'Sample model',negotiable:true,dutyCleared:true,instalmentMonthly:395833,images:[]},
  {id:'12',slug:'mercedes-amg-c-63-s-2021',brand:'Mercedes-AMG',model:'C 63 S',year:2021,condition:'Foreign used',price:110000000,mileage:22100,transmission:'Automatic',engine:'4.0L V8 Biturbo',fuel:'Petrol',bodyType:'Sedan',colour:'Black',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'13',slug:'mercedes-amg-g-63-2022',brand:'Mercedes-AMG',model:'G 63 AMG',year:2022,condition:'Foreign used',price:310000000,mileage:8800,transmission:'Automatic',engine:'4.0L V8 Biturbo',fuel:'Petrol',bodyType:'SUV',colour:'White',status:'Sample model',negotiable:true,dutyCleared:true,newArrival:true,images:[]},
  {id:'14',slug:'mercedes-amg-a45-s-2021',brand:'Mercedes-AMG',model:'A 45 S',year:2021,condition:'Foreign used',price:87000000,mileage:19800,transmission:'Automatic',engine:'2.0L Turbo',fuel:'Petrol',bodyType:'Hatchback',colour:'Yellow',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'15',slug:'mercedes-amg-cle-53-2024',brand:'Mercedes-AMG',model:'CLE 53 Coupe',year:2024,condition:'Brand new',price:198000000,mileage:0,transmission:'Automatic',engine:'3.0L I6 Turbo',fuel:'Petrol',bodyType:'Coupe',colour:'Graphite Grey',status:'Sample model',negotiable:true,dutyCleared:true,newArrival:true,images:[]},
  {id:'16',slug:'mercedes-amg-cla-45-2022',brand:'Mercedes-AMG',model:'CLA 45 S',year:2022,condition:'Foreign used',price:94000000,mileage:17800,transmission:'Automatic',engine:'2.0L Turbo',fuel:'Petrol',bodyType:'Sedan',colour:'Red',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'17',slug:'mercedes-benz-gla-250-e-2021',brand:'Mercedes-Benz',model:'GLA 250 e',year:2021,condition:'Foreign used',price:67000000,mileage:31000,transmission:'Automatic',engine:'1.3L Plug-in Hybrid',fuel:'Hybrid',bodyType:'SUV',colour:'Silver',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'18',slug:'mercedes-benz-c300-coupe-2020',brand:'Mercedes-Benz',model:'C 300 Coupé',year:2020,condition:'Foreign used',price:58000000,mileage:40800,transmission:'Automatic',engine:'2.0L Turbo',fuel:'Petrol',bodyType:'Coupe',colour:'Black',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'19',slug:'mercedes-benz-e350-2021',brand:'Mercedes-Benz',model:'E 350',year:2021,condition:'Foreign used',price:76000000,mileage:26500,transmission:'Automatic',engine:'2.0L Turbo',fuel:'Petrol',bodyType:'Sedan',colour:'White',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'20',slug:'lexus-gx-460-2020',brand:'Lexus',model:'GX 460',year:2020,condition:'Foreign used',price:86000000,mileage:39000,transmission:'Automatic',engine:'4.6L V8',fuel:'Petrol',bodyType:'SUV',colour:'Pearl White',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'21',slug:'lexus-lx-570-2019',brand:'Lexus',model:'LX 570',year:2019,condition:'Foreign used',price:132000000,mileage:47200,transmission:'Automatic',engine:'5.7L V8',fuel:'Petrol',bodyType:'SUV',colour:'Black',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'22',slug:'lexus-es-350-2021',brand:'Lexus',model:'ES 350',year:2021,condition:'Foreign used',price:52000000,mileage:28200,transmission:'Automatic',engine:'3.5L V6',fuel:'Petrol',bodyType:'Sedan',colour:'Silver',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'23',slug:'lexus-nx-350-2022',brand:'Lexus',model:'NX 350',year:2022,condition:'Foreign used',price:73000000,mileage:21400,transmission:'Automatic',engine:'2.4L Turbo',fuel:'Petrol',bodyType:'SUV',colour:'White',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'24',slug:'lexus-rc-350-2020',brand:'Lexus',model:'RC 350',year:2020,condition:'Foreign used',price:61000000,mileage:33500,transmission:'Automatic',engine:'3.5L V6',fuel:'Petrol',bodyType:'Coupe',colour:'Blue',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'25',slug:'lexus-ls-500-2020',brand:'Lexus',model:'LS 500',year:2020,condition:'Foreign used',price:82000000,mileage:29000,transmission:'Automatic',engine:'3.5L Twin Turbo V6',fuel:'Petrol',bodyType:'Sedan',colour:'Black',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'26',slug:'lexus-ux-250h-2022',brand:'Lexus',model:'UX 250h',year:2022,condition:'Foreign used',price:57000000,mileage:17600,transmission:'Automatic',engine:'2.0L Hybrid',fuel:'Hybrid',bodyType:'Crossover',colour:'Grey',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'27',slug:'toyota-land-cruiser-prado-2021',brand:'Toyota',model:'Land Cruiser Prado',year:2021,condition:'Foreign used',price:98000000,mileage:34400,transmission:'Automatic',engine:'4.0L V6',fuel:'Petrol',bodyType:'SUV',colour:'White',status:'Sample model',negotiable:true,dutyCleared:true,images:[]},
  {id:'28',slug:'tesla-model-y-long-range-2022',brand:'Tesla',model:'Model Y Long Range',year:2022,condition:'Foreign used',price:78000000,mileage:22800,transmission:'Automatic',engine:'Dual Motor Electric',fuel:'Electric',bodyType:'SUV',colour:'Pearl White',status:'Sample model',negotiable:true,dutyCleared:true,images:[]}
]

export const cars: Car[] = seedCars.map(car => {
  const gallery = referencePhotos[car.id] || []
  return { ...car, images: gallery.map(photo=>photo.url), photoSources: gallery.map(photo=>photo.source) }
})

export const money = (n:number) => `₦${n.toLocaleString('en-NG')}`
export const km = (n:number) => `${n.toLocaleString('en-NG')} km`
