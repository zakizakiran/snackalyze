const AboutPage = () => {
  return (
    <div className="flex flex-col items-center lg:flex-row-reverse px-4">
      <div className="m-auto">
        <img
          src="/images/about_illustration.svg"
          className="mb-8"
          alt="about illustration"
        />
      </div>
      <div className="lg:w-1/2 lg:pr-32">
        <div className="mb-8">
          <p className="text-sm mb-2 font-bold text-primary">About Us</p>
          <h1 className="text-xl lg:text-3xl font-poppinsMedium mb-4">
            To innovate in order to improve Indonesia's nutritional needs.
          </h1>
          <p>
            At Snackalyze, we believe that innovation holds the key to
            addressing one of Indonesia's most pressing challenges: improving
            nutritional awareness and choices. With a diverse culinary culture
            and a rapidly growing food industry, Indonesians deserve access to
            accurate and reliable information about what they consume.
          </p>
        </div>
        <div></div>
        <h1 className="text-xl lg:text-3xl font-poppinsMedium mb-4">
          Our Mission
        </h1>
        <p>
          Our mission is to empower individuals with the tools they need to make
          informed dietary decisions. By leveraging cutting-edge image
          recognition technology, Snackalyze simplifies the process of
          understanding snack contents, ensuring transparency and promoting
          healthier habits. Together, we aim to revolutionize the way Indonesia
          approaches nutrition, one snack at a time.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
