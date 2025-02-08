import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route, Switch , BrowserRouter as Router} from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import EmailVerification from "./Pages/EmailVerification";
import SuccessEmail from './Pages/SuccessEmail';
import GoogleRedirection from "./Pages/GoogleRedirection";

function App() {
  return (
    <div className="App">
      <Router basename="/chatAppFull">  {/*set basename property to the name of the repo , this is done to overcome 404 error */}
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/chats" component={Chatpage} />
          <Route path="/email-verification" component={EmailVerification} />
          <Route path="/successOtp" component={SuccessEmail} />

          <Route path="/google-redirect" component={GoogleRedirection} />  {/*for google redirect oAuth part */}
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;




//since, App.js me App component is wrapped around ChatProvider(file of context api ) ,so ,any change /updation in the states exported from chatProvider(context api) will re-render the component in which they are called/imported . 
  //so,if for example  i called the user and setUser part from the context api in a component , so,  when i update the user ,so all the components (which imported the user state from the context api will re-render ,obviously the one which are currently active will re-render )
  //but, note -> those components wont be re-rendred where "user" state is just imported from context api but never used .
  //also , parent component of the components (which are getting re-render) will also re-render even they did not import the "user" state from the context api,but,since the child is getting re-rendered ,the parent will also re-render
  

  // example ->
  // component xyz -> parent of children

  // so  , in child component ,i imported user and setUser from the context api ,chatState() .
  // in the child component, if i use the update the user state ,  then xyz component will also re-WebGL2RenderingContext
  // this behaviour can be stopped using React.memo. 