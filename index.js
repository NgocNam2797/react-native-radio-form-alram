/**
 * react-native-radio-form
 * radio component for react native, it works on iOS and Android
 * https://github.com/cuiyueshuai/react-native-radio-form.git
 */
 import React, { Component } from 'react';
 import PropTypes from 'prop-types';
 import {
   View,
   Text,
   ScrollView,
   TouchableWithoutFeedback,
   Dimensions
 } from 'react-native';
 
 const WINDOW_WIDTH = Dimensions.get('window').width;
 
 class RadioForms extends Component {
   constructor(props) {
     super(props);
     this._onPress = this._onPress.bind(this);
     this.renderRadioCircle = this.renderRadioCircle.bind(this);
     this.renderRadioItem = this.renderRadioItem.bind(this);
     this.state = {
       is_active_index:null,
       slectRadio:false
     };
   }
 
   static propTypes = {
     dataSource: PropTypes.array,
     initial: PropTypes.any,
     formHorizontal: PropTypes.bool,
     labelHorizontal: PropTypes.bool,
     itemShowKey: PropTypes.string,
     itemRealKey: PropTypes.string,
     circleSize: PropTypes.number,
     outerColor: PropTypes.string,
     innerColor: PropTypes.string,
     onPress: PropTypes.func,
     fontSize: PropTypes.number,
     alarm: PropTypes.bool,
     isActived: PropTypes.bool
   };
 
   static defaultProps = {
     dataSource: [],
     initial: '',
     formHorizontal: false,
     labelHorizontal: true,
     itemShowKey: 'label',
     itemRealKey: 'value',
     circleSize: 20,
     outerColor: '#E4E4E4',
     innerColor: '#06B050',
     fontSize:16
   };
 
   componentDidMount() {
     const { itemShowKey, itemRealKey, initial, dataSource, createUser } = this.props;
     if (typeof (initial) === 'number') return;
     dataSource.map((item, i) => { 
       if(item.active&&createUser){
         this.setState({
           is_active_index:i
         })
         return i;
       }
     });
   }
 
   _onPress(item, index) {
     this.setState({
       slectRadio:true,
       is_active_index: index,
     });
     if (this.props.onPress) {
      this.props.onPress(item, index);
     }
   }
 
   renderRadioItem(item, i) {
    const { itemShowKey,fontSize } = this.props;
     let isSelected = false;
     const {slectRadio}=this.state;
     if (this.state.is_active_index === i&&slectRadio&&!item.active) {
       isSelected = true;
     }
     if(this.state.is_active_index === i&&!slectRadio&&item.active){
       isSelected = true;
     }

     return (
       <TouchableWithoutFeedback
         key={i}
         onPress={() => this._onPress(item, i)}
       >
         <View
           style={{ padding: 3.5, flexDirection: this.props.labelHorizontal ? 'row' : 'column',
           justifyContent: 'center', alignItems: 'center' }}
         >
           {this.renderRadioCircle(isSelected)}
           <View
             style={{ marginLeft: 3 }}
           >
             <Text style={{fontSize:fontSize, color:'#1D1D1D'}}>{'' + item[itemShowKey]}</Text>
           </View>
         </View>
       </TouchableWithoutFeedback>
     );
   }

   renderRadioCircle(isSelected,isActived) {
     const outerSize = this.props.circleSize > 11 ? this.props.circleSize : 11;
     const innerSize =14;
     return (
       <View
         style={{ width: outerSize, height: outerSize, margin: 5, justifyContent: 'center', alignItems: 'center',
          borderRadius: outerSize / 2, borderWidth: 0.5, borderColor: this.props.outerColor , backgroundColor:'white'}}
       >
         {isSelected&&(<View
          style={{ width: innerSize, height: innerSize, borderRadius: innerSize / 2,
            backgroundColor: isSelected ? this.props.innerColor : 'white' }}
         />
         )}
       </View>
     );
   }
 
   render() {
     return (
       <ScrollView
         {...this.props}
         contentContainerStyle={{
           alignItems: 'flex-start',
           flexDirection: this.props.formHorizontal ? 'row' : 'column',
           flexWrap: 'wrap',
           padding: 5
         }}
         style={[{ width: WINDOW_WIDTH }, this.props.style]}
       >
         {
           this.props.dataSource.map((item, i) => this.renderRadioItem(item, i))
         }
       </ScrollView>
     );
   }
 }
 
 export default RadioForms;
 
