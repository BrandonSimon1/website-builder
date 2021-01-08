import React from 'react';
import logo from './logo.svg';
import './App.css';

const LinkOrDiv = baseStyle => 
  ({href, children, style, ...props}) => 
    href
      ? <a style={{...baseStyle, style}} {...props} href={href}>{children}</a>
      : <div style={{...baseStyle, style}} {...props}>{children}</div>


const gridContainerBaseStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gridAutoRows: '10vh'
}

// styles like background and its own grid position if nested
const GridContainer = LinkOrDiv(gridContainerBaseStyles)

const contentContainerBaseStyles = {
  display: 'flex'
}

// styles like background, border, grid position, 
const ContentContainer = LinkOrDiv(contentContainerBaseStyles)

const textFieldBaseStyles = {
  display: 'block'
}

const TextField = LinkOrDiv(textFieldBaseStyles) 

// interface ThemeObject {
//   type: string
//   style: json
//   children: ThemeObject[]
// }

function App() {
  return (
  );
}

export default App;
