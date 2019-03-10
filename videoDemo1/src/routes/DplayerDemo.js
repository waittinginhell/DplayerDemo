import React from 'react';
import {Button} from 'antd';
import 'dplayer/dist/DPlayer.min.css';
import Dplayer from 'dplayer';
import './dplayerDemo.less';
class LeetCodePractice extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dp:null,
      isPlay:false,
      isSwitch:false,
    }
  }
  componentDidMount(){
    let t = this;
    let time = sessionStorage.getItem('time');
    let options = {
      container:document.getElementById('player'),
      //screenshot:true,
      autoplay: false,
      hotkey:true,//开启热键
      theme: '#FADFA3',
      mutex:true,//互斥，阻止多个播放器同时播放
      highlight:[
        {
          time: 20,
          text: '这是第 20 秒'
        },
        {
          time: 40,
          text: '这是 40秒'
        }
      ],
      video: {
        // url:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        // thumbnails: 'thumbnails.jpg',
        quality: [
          {
          name: 'SD',
          url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
          type: 'normal'
        }],
        defaultQuality: 0,
        thumbnails: 'thumbnails.jpg',
      },
      //defaultQuality: 0,
      danmaku: {
        id: 'demo',
        api: 'https://api.prprpr.me/dplayer/',
        maximum:1000,
        unlimited:true,
        bottom:'15%',
        user:'DIYgod',
      }
    };
    const dp = new Dplayer(options);
    dp.on('play', function () {
      t.setState({
        isPlay:true,
      })
    });
    dp.on('playing', function (e) {
      if(time){
        t.time = setTimeout(() => {
          t.setState({
            time:''
          })
        },2000)
      }
     
    });
    dp.on('contextmenu_hide',function () {
      
    })
    this.setState({
      dp,
      time:Math.floor(time)
    })
  }
  componentWillUnmount(){
    let dp = this.state.dp;
    if(dp){
      dp.destroy();
    }
  }
  //停止
  pause = () => {
    let dp = this.state.dp;
    if(dp){
      dp.pause();
    }
  }
  //跳转
  seek = () => {
    let dp = this.state.dp;
    if(dp){
      dp.seek(40);
    }
  }
  //原生js
  videoChange = () => {
    let dp = this.state.dp;
    console.log(1111,dp.video.currentTime,dp.video.duration)
  }
  //绘制弹幕
  drawDanmuChange = () => {
    let value = 'ewqwqw', dp = this.state.dp;
    dp.danmaku.draw({
      text:value,
      color:'#fff',
      type:'top',
    })
  }
  //音量改变
  volumeChange = () => {
    let dp = this.state.dp;
    if(dp){
      dp.volume(0.1,true,false)
    }
  }
  //切换视频
  switchVideoChange = () => {
    let dp = this.state.dp;
    if(dp){
      dp.switchVideo({
        url: this.state.isSwitch?'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4':'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        //pic: 'second.png',
        thumbnails: 'second.jpg'
      }, {
        id: 'test',
        api: 'https://api.prprpr.me/dplayer/',
        maximum: 3000,
        user: 'DIYgod'
      });
    }
    this.setState({
      isSwitch:!this.state.isSwitch
    })
  }
  //时间跳转
  jump = () => {
    const {dp,time} = this.state;
    if(dp){
      dp.seek(time);
    }
    this.setState({
      time:0,
    })
  }
  render(){
    const {dp,time,isPlay} = this.state;
    const listener = ev => {
      let time = Math.floor(dp.video.currentTime);
      let totalTime = Math.floor(dp.video.duration);
      if(time !== totalTime){
        sessionStorage.setItem('time',dp.video.currentTime)
      }else {
        sessionStorage.setItem('time','')
      }
      
    };
    window.addEventListener('beforeunload',listener);
    return(
      <div>
        <div style={{width:400, height:300}} id="player">
          {time?<div style={{display:isPlay?'block':'none'}} className="time" onClick={this.jump}>你上次已播放到{time}</div>:null}
        </div>
        
        <Button onClick={this.pause}>pause</Button>
        <Button onClick={this.seek}>seek</Button>
        <Button onClick={this.videoChange}>video</Button>
        <Button onClick={this.drawDanmuChange}>drawDanmu</Button>
        <Button onClick={this.volumeChange}>volume</Button>
        <Button onClick={this.switchVideoChange}>switchVideo</Button>
      </div>
    )
  }
}
export default LeetCodePractice;