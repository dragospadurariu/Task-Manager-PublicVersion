import React from 'react';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

const Box = styled(animated.div)`
  background: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
`;
const ToolTipComponent = (props) => {
  function onMount() {
    setSpring({
      opacity: 1,
      transform: 'scale(1)',
      onRest: () => {},
      config,
    });
  }

  function onHide({ unmount }) {
    setSpring({
      ...initialStyles,
      onRest: unmount,
      config: { ...config, clamp: true },
    });
  }

  const initialStyles = { opacity: 0, transform: 'scale(0.5)' };
  const [properties, setSpring] = useSpring(() => initialStyles);
  const config = { tension: 300, friction: 15 };

  return (
    <Tippy
      render={(attrs) => (
        <Box style={properties} {...attrs}>
          {props.text}
        </Box>
      )}
      animation={true}
      onMount={onMount}
      onHide={onHide}
    >
      {props.children}
    </Tippy>
  );
};

export default ToolTipComponent;
