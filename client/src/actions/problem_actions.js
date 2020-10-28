export const LOAD_TESTS = 'LOAD_TESTS';


export const getTest = async (problemId, code, csrf) => async(dispatch, getState) => {
    //fetch problem tests from backend
    const response  = await fetch('GET')
}
