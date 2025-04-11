import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(4);
  const [Nums, setNums] = useState(false);
  const [chars, setchars] = useState(true);
  const [password, setpassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (Nums) str += "0123456789";
    if (chars) str += "{}[]()*&^%$#@!`~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, Nums, chars, setpassword]);
  const passwordRef = useRef(null);

  const copytoclipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    generatePassword();
  }, [length, Nums, chars, setpassword]);
  return (
    <>
      <h1 className="text-4xl text-center font-bold">
        Password Generater in Optimized way.
      </h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-9 text-orange-500 bg-gray-700 ">
        <h1 className="text-2xl text-center my-4">Password Generater</h1>
        <div className="flex shadow rounded-lg mb-4 overflow-hidden">
          <input
            type="text"
            value={password}
            className="outline-none w-full text-black px-3 py-1 bg-white "
            placeholder="Password"
            ref={passwordRef}
            readOnly
          />

          <button
            onClick={copytoclipboard}
            className="bg-blue-500 text-white px-4 py-1 hover:bg-blue-600 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-xs text-orange-500 gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={4}
              max={10}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setlength(e.target.value)}
            />
            <label>Length: {length} </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="NumberInput"
              defaultChecked={Nums}
              onChange={() => {
                setNums((prev) => !prev);
              }}
            />
            <label htmlFor="NumberInput">Include Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="CharInput"
              defaultChecked={chars}
              onChange={() => {
                setchars((prev) => !prev);
              }}
            />
            <label htmlFor="CharInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
