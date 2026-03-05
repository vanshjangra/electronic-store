function About({title="Default title", phone="Default phone", myFun}){
    return <div>
        <h1>This is about component</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, molestiae.</p>
        <button onClick={myFun}>Click me</button>
        {title}, {phone}
    </div>;
}

export default About