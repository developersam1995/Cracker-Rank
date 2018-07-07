function compareArrays(a, b, doesOrderMatter = true) {
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  if(!doesOrderMatter) {
    a.sort();
    b.sort();
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i] || typeof b[i] == 'object') return false;
  }
  return true;
}

module.exports = (testFn, args, expectedOutput, doesOrderMatter) => {
  let result;
  let ø = Object.create( null );
  try {
    result = testFn.apply(ø,args);
  }
  catch(err) {
    return {error: err, success:false};
  }
  if(Array.isArray(expectedOutput)) {
    let areEqual = compareArrays(expectedOutput,result,doesOrderMatter);
    if(areEqual) return {success: true};
  }
  
  if(result === expectedOutput) {
    return {success: true};
  }

  return {success:false};
};
