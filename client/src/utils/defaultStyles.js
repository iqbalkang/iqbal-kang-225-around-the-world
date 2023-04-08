export default {
  control: {
    fontSize: 14,
    fontWeight: 'normal',
  },

  '&multiLine': {
    control: {
      fontFamily: 'Josefin Sans',
    },
    // highlighter: {
    //   padding: 9,
    //   border: '1px solid transparent',
    // },
    input: {
      outline: 'none',
    },
  },

  '&singleLine': {
    display: 'inline-block',
    width: 180,

    highlighter: {
      padding: 1,
      border: '2px inset transparent',
      backgroundColor: 'red',
    },
    input: {
      padding: 1,
      border: '2px inset',
      position: 'relative',
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'black',
      borderRadius: '10px',
      overflow: 'hidden',
      position: 'absolute',
      bottom: '30px',
      left: '0px',
      width: '200px',
    },
    item: {
      padding: '8px 15px',
      textTransform: 'capitalize',
      '&focused': {
        backgroundColor: '#FF7474',
      },
    },
  },
}
