import React from 'react';

class QualityBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
    this.clickBtn = this.clickBtn.bind(this);
  }
  clickBtn() {
    if (this.state.clicked) {
      this.props.quality[1]--;
    } else {
      this.props.quality[1]++;
    }
    this.setState({
      clicked: !this.state.clicked
    })
  }
  render() {
    return (
      <div className="guinzar-review-quality">
        <button className="guinzar-review-quality-btn" onClick={this.clickBtn} style={this.state.clicked
          ? {backgroundColor: '#fdf400', fontWeight: 'bold', color: '#ef4836'} : {}}>
          {this.props.quality[0]} {this.props.quality[1]}
        </button>
      </div>
    )
  }
}
export default QualityBtn;