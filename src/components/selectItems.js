const origin = [
  {
    value: 'nigeria',
    label: 'NG',
  },
  {
    value: 'ghana',
    label: 'GH',
  },
  {
    value: 'rsa',
    label: 'RSA',
  },
  {
    value: 'senegal',
    label: 'SG',
  },
  {
    value: 'kenya',
    label: 'KN',
  },
  {
    value: 'ivory_coast',
    label: 'IVR',
  },
];

const destination = [
  {
    value: 'us',
    label: 'USA',
  },
  {
    value: 'europe',
    label: 'EU',
  }
];

const goodsType = [
  {
    value: 'non perishable',
    label: 'Non perishable',
  },
  {
    value: 'perishable',
    label: 'Perishable',
  }
];

const weightUnits = [
  {
    value: 0.4535,
    label: 'lbs',
  },
  {
    value: 1,
    label: 'kg',
  },
  {
    value: 1000,
    label: 'Mt.',
  },
];

const distanceToPort = [
  {
    value: 81.6,
    label: 'Akosombo',
  },
  {
    value: 5.6,
    label: 'Tema Free Zone',
  },
  {
    value: 118.2,
    label: 'Asesawa',
  },
];

const distanceUnits = [
  {
    value: 1,
    label: 'Km',
  },
  {
    value: 0.6214,
    label: 'Miles',
  }
];

const percentageVal = [
  {
    value: 0.05,
    label: 'Cocoa'
  },
  {
    value: 0.03,
    label: 'Mango'
  }
];

const distanceToBuyer = [
    {
        value: 48,
        label: 'New-York'
    },
    {
        value: 35,
        label: 'Illinois'
    },
    {
        value: 17,
        label: 'Zurich'
    },
    {
        value: 30,
        label: 'Felixstowe'
    }
];

export {
  origin,
  destination,
  goodsType,
  weightUnits,
  distanceUnits,
  distanceToPort,
  percentageVal,
  distanceToBuyer
}
