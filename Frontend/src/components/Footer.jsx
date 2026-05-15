

const Footer = () => {
  return (
    <div>
      {/* warning message  */}
      <p className="text-sm text-center p-1 ">
        NeuroChat AI may generate inaccurate responses. Verify important information independently. See &nbsp;
        <u className="cursor-pointer  hover:text-purple-600">
          Cookie Preferences
        </u>{" "}
        .
      </p>
    </div>
  );
};

export default Footer;
