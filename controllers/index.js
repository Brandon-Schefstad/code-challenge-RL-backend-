exports.renderIndexPage = (req, res) => {
	const dinosaurFacts = [
		'The heaviest dinosaur was Argentinosaurus at 77 tonnes. It was the equivalent to 17 African Elephants.',
		'The smallest fully-grown fossil dinosaur is the little bird-hipped plant-eater lesothosaurus, which was only the size of a chicken.',
		"If it lives in water, it's not a dinosaur",
		'Stegosaurus had a brain the size of a walnut - only 3 centimetres long and weighing 75 grams. ',
		'Dinosaurs were only classified in 1842.',
		'You can tell the difference between a dinosaur fossil and a stone by licking it.',
		'All four-legged dinosaurs were herbivores.',
		'Up until 1923, we didn’t know how dinosaurs were born.',
	]
	return res.json({
		dinosaurFacts:
			dinosaurFacts[Math.floor(Math.random() * dinosaurFacts.length)],
	})
}
