## Game Portal
Game Portal is video game database and game discovery service that consists of 350,000+ games.

## Motivation
Motivation behind this project was to compare client side rendering and server side rendering.
Also, to grasp the implemention of SEO and sitemap.
Next.js provides bunch of cool features to facilitate SEO, SSR and differentiation between CSR and SSR 

## Features
 - Game Portal utilized with [Next.js](https://nextjs.org/). It uses Incremental Static Regeneration(ISR) which we don't have to stop relying on dynamic content, as static content can also be dynamic.
So that ISR allows us to update existing pages by-rerendering them in the background as traffic comes in. This makes our app very powerful.

 - Another powerful library is [SWR](https://swr.vercel.app/) which is remote data fetching library. Thanks to that library, every fetch request is cached and It comes with the
 up-to-date data again even after paginations. It heavily takes advantage of static and dynamic web applications.
 
 - Complementary features of Game Portal are Infinite Scrolling(IntersectionObserver API) and [Lazy Loading](https://github.com/Aljullu/react-lazy-load-image-component) library.
  Combination of Lazy loading and SWR makes app more optimized
  
 - Lastly, users can sign up via [Firebase](https://firebase.google.com/) and comment about games

## Screenshots

<div align="center">
    <img src="https://i.imgur.com/Op4dcy4.png" height='250px' style='object-fit: contain;' </img>
  <img src="https://i.imgur.com/3SHon9c.png" height='250px' style='object-fit: contain;'</img> 
  
</div>


## Tech/framework used

<b>Utilized with</b>
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [SWR](https://swr.vercel.app/)
- [Material UI](https://material-ui.com/)
- [Redux](https://redux.js.org/)
- [Node.js](https://nodejs.org/en/)
- [Firebase](https://firebase.google.com/)
- [Formik](https://formik.org/)
- [react-slick](https://react-slick.neostack.com/)
- [yup](https://github.com/jquense/yup)
- [lazy-load-image](https://github.com/Aljullu/react-lazy-load-image-component)

## Credits & API usage
Game Portal uses [RAWG.IO](https://rawg.io/apidocs) API to provide game datas
