const BRANDS = "BRANDS";
const MODELS = "MODELS";
const TYPES = "TYPES";
const DEVICES = "DEVICES";

const initialState = {
  brand:[],
  models:[],
  types:[],
  devices:[],
  tastes:[]
};

export function deviceReducer(state = initialState, action) {
  switch (action.type) {
    case BRANDS: {
      return {
        ...state,
        brand: (action.payload ? action.payload: []) ,
      };
    }
    case MODELS: {
      return {
        ...state,
        models: action.payload,
      };
    }
    case TYPES: {
      return {
        ...state,
        types: (action.payload ? action.payload: []),
      };
    }
    case DEVICES: {
      const resultMap = {};

      for (const device of action.payload) {
        const { id } = device;

        for (const taste of device.model.tastes) {
          const key = `${device.model.title}-${taste.title}`;

          if (!resultMap[key]) {
            resultMap[key] = {
              currentDevice: device.id,
              brand: device.brand,
              brandId: device.brandId,
              model: device.model,
              type: device.type,
              typeId: device.typeId,
              modelId: device.modelId,
              createdAt: device.createdAt,
              updatedAt: device.updatedAt,
              taste,
              id: resultMap[key] ? id : id + "-" + taste.title,
            };
          }
        }
      }

      const result = Object.values(resultMap);
      return {
        ...state,
        devices: result,
      };
    }
    default:
      return state;
  }
}

export const actionGetBrands = (payload) => ({ type: BRANDS, payload });
export const actionGetModels = (payload) => ({ type: MODELS, payload });
export const actionGetTypes = (payload) => ({ type: TYPES, payload });
export const actionGetDevices = (payload) => ({ type: DEVICES, payload });
