
import { createBrowserRouter, Outlet } from 'react-router-dom'
import './App.css'
import Body from './components/Body'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Cart from './components/Cart'
import BookDetails from './components/BookDetails'
import Home from './components/Home'


function AppLayout() {


  return (
    <div className="min-h-screen bg-gray-100">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,

    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:"about",
        element:<About/>
      },{
        path:"cart",
        element:<Cart/>
      },{
        path: "books",
        element: <Body />,
      },
      {
        path:"books/:bookId",
        element:<BookDetails/>
      },
    ],
  }
])

export default AppLayout
