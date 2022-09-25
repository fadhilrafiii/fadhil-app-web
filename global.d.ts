// For importing css modules
declare module '*.module.css';

// For adding path in Lottie options props
declare module 'react-lottie' {
  interface Options {
    path?: string;
  }

  interface LottieProps {
    options: Options;
  }

  export default Lottie;
}
