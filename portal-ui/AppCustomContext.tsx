import { Dispatch, FC, SetStateAction, createContext, useEffect, useState } from "react"

type AppCustomContextProps = {
  date: string,
  location: string,
  setTime: Dispatch<SetStateAction<string>>,
  setLocation: Dispatch<SetStateAction<string>>
};

type AppCustomContextPropsProviderProps = {
  children: React.ReactNode
}

export const AppCustomContext = createContext<AppCustomContextProps | null>(null)

const AppCustomContextPropsProvider: FC<AppCustomContextPropsProviderProps> = (props: AppCustomContextPropsProviderProps) => {

  const [date, setDate] = useState('Default Date')
  const [location, setLocation] = useState('')

  useEffect(()=> {
    setDate(new Date().toLocaleString())
    navigator.geolocation.getCurrentPosition(success, error);
  }, [date, location])
  
  const success = (position: GeolocationPosition) => {
    setLocation(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
  }
  
  const error = (err: any) => {
    console.log("Unable to retrieve your location", err);
  }

  return (
    <AppCustomContext.Provider value={{
      date: date,
      location: location,
      setTime: setDate,
      setLocation: setLocation,
    }}>
      {props.children}
    </AppCustomContext.Provider>
  )
}

export default AppCustomContextPropsProvider