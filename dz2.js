function getValueByPath(obj, path) {
  const keys = path.split(/\[|\]|\./).filter(key => key !== ''); 
    let value = obj; 
  
    keys.forEach((key) => {
      if (value && typeof value === "object" && key in value) {
        value = value[key];
      }else if (Array.isArray(value) && !isNaN(key)) {
        const index = parseInt(key);
        value = value[index];
    } else {
        value = undefined;
        console.log('this value not found');
        return; 
      }
    }); 
    return value;
  }


  const obj = {
    arr: [
      { name: "Test" }
    ]
  }; 
  
  console.log(getValueByPath(obj, 'arr[0].name'));
  