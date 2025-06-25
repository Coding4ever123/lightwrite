document.addEventListener("DOMContentLoaded", () => {
    mocha.setup("bdd");

    describe("should be defined", () => {
        it("lw", () => {
            chai.expect(lw).is.a("function");
        });
        it("lw.as", () => {
            chai.expect(lw.as).is.a("function");
        });
        it("lw.as.string", () => {
            chai.expect(lw.as.string).is.a("function");
        });
        it("lw.as.element", () => {
            chai.expect(lw.as.element).is.a("function");
        });
    });
    it("lw.default matches lw", () => {
        chai.expect(lw.default).eql(lw);
    });
    it("should create a valid element string", () => {
        chai.expect(lw.as.string(lw("div"))).eql("<div></div>");
    });
    it("should have the ability to nest", () => {
        chai.expect(lw.as.string(lw("div")(lw("p")("hello")))).eql(
            "<div><p>hello</p></div>"
        );
    });
    it("should have the ability to add multiple children", () => {
        chai.expect(
            lw.as.string(lw("div")(lw("p")("hello"), lw("p")("world!")))
        ).eql("<div><p>hello</p><p>world!</p></div>");
    });
    it("should also work with the elements registry", () => {
        chai.expect(
            lw.as.string(
                lw.elements.div(lw.elements.p("hello"), lw.elements.p("world!"))
            )
        ).eql("<div><p>hello</p><p>world!</p></div>");
    });
    it("should also work with template strings", () => {
        chai.expect(
            lw.as.string(
                lw.elements.div.class`test${1}`(
                    lw.elements.p`hell${"o"}`,
                    lw.elements.p`world${"!"}`
                )
            )
        ).eql('<div class="test1"><p>hello</p><p>world!</p></div>');
    });

    mocha.run();
});
