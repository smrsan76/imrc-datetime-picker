import Loadable from "react-loadable";

export default function(loader, opts = {}) {
  const defaultOpts = {
    loading: () => null,
    delay: 200
  };

  const mergeWithDefaultOpts = opts => {
    return Object.assign(defaultOpts, opts);
  };

  const setOpts = opts => {
    opts.loader = loader;
    return Loadable(mergeWithDefaultOpts(opts));
  };

  return opts.setOptsLater ? setOpts : setOpts(opts);
}
