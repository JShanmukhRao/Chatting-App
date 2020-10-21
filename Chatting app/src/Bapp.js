import React,{Component} from "react"
import Carousel from 'reactstrap'
class Bpp extends Component{

render(){
return(<div>
<Carousel>
<Carousel.Item>
       <img src="../assets/images/home1.jpg" />
</Carousel.Item>
<Carousel.Item>
       <img src="../assets/images/laddu.jpg" />
</Carousel.Item>
<Carousel.Item>
       <img src="../assets/images/home2.jpg" />
</Carousel.Item>
</Carousel>
</div>
);
}

}
export default Bpp