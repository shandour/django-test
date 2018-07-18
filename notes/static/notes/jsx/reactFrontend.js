import React from 'react';
import ReactDOM from 'react-dom';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    ListGroupItem,
    ListGroup,
    Grid,
    Col
} from 'react-bootstrap';
import {BrowserRouter, Route} from 'react-router-dom';


class App extends React.Component {
    render () {
        return (
                <BrowserRouter>
                <Grid fluid>
                <Col md={6} mdOffset={3}>
                <Route exact path="/" component={FormList}/>
                </Col>
                </Grid>
                </BrowserRouter>
        );
    }
}


class FormList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            errors: [],
            loaded: false,
            lastAddedId: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchNotes = this.fetchNotes.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();

        const csrfmiddlewaretoken = document.querySelector("input[name='csrfmiddlewaretoken']").value;
        const textValue = this.input.value;

        const req = new Request('/notes',
                                {credentials: 'same-origin',
                                 method: 'POST',
                                 body: new URLSearchParams({'csrfmiddlewaretoken': csrfmiddlewaretoken,
                                                            'text': textValue})});
        try {
            const resp = await fetch(req);
            if (resp.ok) {
                const json = await resp.json();
                const lastAddedId = json['id'];

                await this.fetchNotes(lastAddedId);
            } else {
                const json = await resp.json();
                this.setState({
                    errors: json['text'],
                    lastAddedId: null
                });
            }
        } catch (e){
            console.log(e.message);
        }
    }

    async componentDidMount() {
        await this.fetchNotes(null);
    }

    async fetchNotes(lastAddedId) {
        try {
            const resp = await fetch('/notes');
            if (!resp.ok) {
                throw new Error(`Status code ${resp.status_code}.`);
            } else {
                const json = await resp.json();

                if (lastAddedId) {
                    this.input.value = '';
                }

                this.setState({
                    notes: json,
                    loaded: true,
                    errors: [],
                    lastAddedId: lastAddedId
                });
            }
        } catch(e) {
            console.log(`GET request failed. Reason: ${e.message}`);
        }
    }

    render () {
        const {notes, errors, loaded, lastAddedId} = this.state;

        if (!loaded) {
            return (<h2>Loading...</h2>);
        } else {
            let validationState = null;

            if (errors.length > 0) {
                validationState = 'error';
            } else if (lastAddedId) {
                validationState = 'success';
            }

            return (
                    <div>
                    <form onSubmit={this.handleSubmit}>
                    <FormGroup validationState={validationState}>
                    <ControlLabel>Note content</ControlLabel>
                    <FormControl
                placeholder="Write about what's on your mind"
                name="text"
                inputRef={(ref) => {this.input = ref}}
                componentClass="textarea"
                    />
                    </FormGroup>
                    <FormControl.Feedback/>
                    {errors &&
                    <HelpBlock>
                     {errors.map(e => e)}
                     </HelpBlock>}
                    <FormControl type="submit" value='Add note'/>
                    </form>

                {lastAddedId &&
                 <div id="item-added">
                 Note #{lastAddedId} successfully added
                 </div>}

                    <div>
                    {notes &&
                     <Notes notes={notes} lastAddedId={lastAddedId}/>
                    }
                    </div>
                    </div>
            );
        }
    }
}



const Notes = props => (
    <ListGroup>
        { props.notes.map(note => {
            let styleClass = null;
            if (props.lastAddedId !== null && props.lastAddedId == note.id) {
                styleClass = 'lastAdded';
            }
            return (<Note key={note.id} id={note.id} text={note.text} styleClass={styleClass}/>);
        })}
    </ListGroup>
);

const Note = props => (
        <ListGroupItem className={props.styleClass} header={`Note #${props.id}`} id={props.id.toString()}>
        {props.text}
    </ListGroupItem>
);


ReactDOM.render(
  <App/>,
  document.getElementById('main')
);
