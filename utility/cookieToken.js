import getJwtToken from "./getJwtToken.js";

const cookieToken = (user, res) => {
  const token = getJwtToken(user.id);
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  user.password = undefined;

  return (
    res.status(200).cookie("token", token, options).
    json({
      success: true,
      token,
      user,
    })
  );
};


export default cookieToken