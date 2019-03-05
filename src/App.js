import React, { Component } from 'react';
import './App.css';
import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';
import { withAuthenticator } from 'aws-amplify-react'
import awsconfig from './aws-exports';

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);
// send analytics events to Amazon Pinpoint
Analytics.configure(awsconfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.handleAnalyticsClick = this.handleAnalyticsClick.bind(this);
    this.state = {analyticsEventSent: false, resultHtml: "", eventsSent: 0};
  }

  handleAnalyticsClick() {
      Analytics.record('AWS Amplify Tutorial Event')
        .then( (evt) => {
            const url = 'https://console.aws.amazon.com/pinpoint/home/?region=us-east-1#/apps/'+awsconfig.aws_mobile_analytics_app_id+'/analytics/events';
            let result = (<div>
              <p>Event Submitted.</p>
              <p>Events sent: {++this.state.eventsSent}</p>
              <a href={url} target="_blank">View Events on the Amazon Pinpoint Console</a>
            </div>);
            this.setState({
                'analyticsEventSent': true,
                'resultHtml': result
            });
        });
  }

  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <button className="App-button" onClick={this.handleAnalyticsClick}>Analytics Event</button>
          {this.state.analyticsEventSent}
          <div>{this.state.resultHtml}</div>
        </div>
      </div>
    );
  }
}

export default withAuthenticator(App);
