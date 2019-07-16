import React,{Component} from 'react'
import {Button,TextInput,Form,Box} from 'grommet'
import {Add} from 'grommet-icons'
class WoonChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.message);
        this.setState({
            message: ''
        })
    }
    render() {
        return (
            <Box
            as="footer"
            border={{ side: "top" }}
            pad="small"
            justify="end"
            direction="row"
            align="center"
          >
                <Button icon={<Add/>}/>
                <TextInput className="message-input" type="text" onChange={this.handleChange} value={this.state.message}/>
                <Button className="message-submit" type="submit" label="send" onClick={this.handleSubmit}/> 
            </Box>
        )
    }
}
export default WoonChatInput