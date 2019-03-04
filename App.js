import React, { Component } from 'react';
import { Image, View, Text, TouchableWithoutFeedback, StatusBar } from 'react-native';


export default class AnalogClock extends Component {

  constructor(props) {
    super(props);
    var Sound = require('react-native-sound');
    Sound.setCategory('Playback');
    let curTime = new Date();
    this.state = {
      curTime: curTime.toLocaleTimeString(),
      colors: ["black", "green", "pink", "yellow", "red", "blue"],
      digitalColor: "black",
      sec: curTime.getSeconds() * 6,
      min: curTime.getMinutes() * 6 + (curTime.getSeconds() * 1 / 10),
      hour: curTime.getHours() % 12 * 30 + (curTime.getMinutes() * 1 / 2) + curTime.getSeconds() * 1 / 120,
      ticking: new Sound('ticking.mp3', Sound.MAIN_BUNDLE),
      image: true,
      clockFrame: require('./img/clock.png')
    };

  }

  componentDidMount() {
    this.timer = setInterval(() => {
      let curTime = new Date();
      this.setState({ sec: curTime.getSeconds() * 6 + curTime.getMilliseconds() * 6 / 1000 });
    }, 1);

    this.play = setInterval(() => {
      this.state.ticking.play();
      let curTime = new Date();
      this.setState({ curTime: curTime.toLocaleTimeString() })
      this.setState({ min: curTime.getMinutes() * 6 + (curTime.getSeconds() * 1 / 10) });
      this.setState({ hour: curTime.getHours() % 12 * 30 + (curTime.getMinutes() * 1 / 2) + curTime.getSeconds() * 1 / 120 })
    }, 1000);

  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  hourHandStyles() {
    return {
      width: 0,
      height: 0,
      position: 'absolute',
      backgroundColor: this.props.hourHandColor,
      paddingHorizontal: this.props.hourHandWidth,
      paddingTop: this.props.hourHandLength,
    }
  }
  minuteHandStyles() {
    return {
      width: 0,
      height: 0,
      position: 'absolute',
      backgroundColor: this.props.minuteHandColor,
      paddingTop: this.props.minuteHandLength,
      paddingHorizontal: this.props.minuteHandWidth,

    }
  }
  secondHandStyles() {
    return {
      width: 0,
      height: 0,
      position: 'absolute',
      backgroundColor: this.props.secondHandColor,
      paddingTop: this.props.secondHandLength,
      paddingHorizontal: this.props.secondHandWidth,
    }
  }

  _changeClockFrame(e) {
    this.setState({ image: !this.state.image })
    this.state.image ? this.setState({ clockFrame: require('./img/clockRomanic.png') }) : this.setState({ clockFrame: require('./img/clock.png') })
  }

  _chageDigitalStyle(e) {
    this.setState({ digitalColor: this.state.colors[Math.floor(Math.random() * 6)] });

  }
  _resetDigital(e) {
    this.setState({ digitalColor: "black" })

  }

  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: "lightblue" }}>
        <StatusBar backgroundColor="lightblue" barStyle="dark-content" />
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TouchableWithoutFeedback style={{ position: 'absolute', width: 140 * 2, height: 140 * 2 }}
            onPress={() => this._changeClockFrame()}>
            <Image
              style={{ position: 'absolute', width: 140 * 2, height: 140 * 2 }}
              resizeMode='stretch'
              source={this.state.clockFrame}
            />
          </TouchableWithoutFeedback>
          <View style={[this.hourHandStyles(),
          {
            transform:
              [
                { rotate: this.state.hour + 'deg' },
                { translateY: -(this.props.hourHandOffset + this.props.hourHandLength / 2) }
              ]
          }]}
          />
          <View style={[this.minuteHandStyles(),
          {
            transform:
              [
                { rotate: this.state.min + 'deg' },
                { translateY: -(this.props.minuteHandOffset + this.props.minuteHandLength / 2) }
              ]
          }]}
          />
          <View style={[this.secondHandStyles(),
          {
            transform:
              [
                { rotate: this.state.sec + 'deg' },
                { translateY: -(this.props.secondHandOffset + this.props.secondHandLength / 2) }
              ]
          }]}
          />
        </View>
        <Text style={{ fontSize: 50, color: this.state.digitalColor }} onLongPress={(e) => this._resetDigital(e)} onPress={(e) => this._chageDigitalStyle()}>{this.state.curTime}</Text>
      </View>
    )
  };
};

AnalogClock.defaultProps = {
  hourHandLength: 90,
  hourHandWidth: 3.5,
  hourHandOffset: 0,
  minuteHandLength: 110,
  minuteHandWidth: 2,
  minuteHandOffset: 0,
  secondHandLength: 120,
  secondHandWidth: 1,
  secondHandOffset: 0,
  DOUBLE_PRESS_DELAY: 200,

  secondHandColor: "black",
  minuteHandColor: "black",
  hourHandColor: "black",

};