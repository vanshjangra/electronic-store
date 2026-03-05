import './App.css';
import About from './components/About';
import Services from './components/Services';

function App() {
  const tempFun = () => {
    console.log("This is temp fun");
  };

  let styled = {
      backgroundColor: "#e2e2e2",
      borderRadius: "10px",
      color: "black",
      padding: "20px"
  };

  return (
    <div className='container' style={styled}>
        <h1>This is heading</h1>
          
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur odit tempora odio repudiandae dolorum quaerat ex reprehenderit, et, laudantium exercitationem perspiciatis rerum illum, culpa aliquid error. Animi voluptatum modi iure.
          {2 + 5}
          <br/>
          {new Date().toDateString()}

          <About title="Dynamic About" phone="234523523" myFun={tempFun}/>
          <Services/>
        </p>
    </div>
  );
}

export default App;
