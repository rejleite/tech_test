

const OkatJwtVerifier = require('@okta/jwt-verifier');

const okatjwtverifier = new OkatJwtVerifier({issuer: process.env.ISSUER});

/**
 * This function first checks that the authorization header is on the request and throws an error otherwise. 
 * If it exists:
 * then 
 *   if it looks like Bearer {token} ({token} is a JWT string)
 *   then  
 *      if  Okta’s JWT Verifier {token} is valid
 *      then 
 *           return an object with some information
 *      else 
 *           throw an error token invalid.
 *   else 
 *      throw error "the header doesn’t start with Bearer". 
 * else 
 *    throw error. 
 */

var check_authorization = async(req, res, next) => {
    try {
        const {authorization} = req.headers;
        if (! authorization) {
            throw new Error('You must send an Authorization header');
        }

        const [authType, token] = authorization.trim().split(' ');
        if(authType !== 'Bearer'){
            throw new Error('Expected a Bearer token');
        }

        const {claims} = await okatjwtverifier.verifyAccessToken(token);
        if (! claims.scp.includes(process.env.SCOPE)){
            throw new Error('Could not verify the proper scope.');
        }

        next();

    } catch (error) {
        next(error.message)
    }
};

module.exports = check_authorization;