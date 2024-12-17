<script>
	import { page } from '$app/stores';
	import ListItem from '$lib/components/ListItem.svelte';
	let { data } = $props();
	let currentQuestion = $state(0);
	let selectedAnswer = $state(' ');
	let score = $state(0);
	let submitted = $state(false);

	function handleSubmit() {
		submitted = true;
		data.questions[currentQuestion].selectedAnswer = selectedAnswer;
		if (selectedAnswer === data.questions[currentQuestion].answer) {
			score += 1;
		}
	}

	function nextQuestion() {
		currentQuestion++;
		submitted = false;
	}

	//schreibe eine Funktion, welche es möglich macht, die Frage und die Punkte zu spreichern auch wenn man die Seite neu laden muss
	function saveData() {
		localStorage.setItem('currentQuestion', currentQuestion);
		localStorage.setItem('score', score);
	}

	//und schreibe dann noch eine $effect Funktion, welche es ermöglicht, dass die Daten wieder geladen werden

	$effect(() => {
		if (localStorage.getItem('currentQuestion')) {
			currentQuestion = parseInt(localStorage.getItem('currentQuestion'));
		}
		if (localStorage.getItem('score')) {
			score = parseInt(localStorage.getItem('score'));
		}
	});
</script>

{#if currentQuestion < data.questions.length}
	{#each data.questions as question, index (question.question)}
		{#if index === currentQuestion}
			<p>Question {index + 1} of {data.questions.length}</p>
			<br />
			<h2><strong>{question.question}</strong></h2>
			<br />
			{#each question.options as option, index (option)}
				{#key submitted}
					<br />
					<ListItem
						title={option}
						{index}
						correctAnswer={question.selectedAnswer && question.answer === option}
						incorrectlySelected={question.selectedAnswer === option && question.answer !== option}
						focusAction={() => (selectedAnswer = option)}
						disabled={submitted}
					></ListItem>
				{/key}
			{/each}
		{/if}
	{/each}
{:else}
	<h2>Game Over!</h2>
	<br />
	<p>You scored {score} out of {data.questions.length} points!</p>
	<br />
	<button class="btn btn-primary" onclick={window.location.reload()}> Play again! </button>
{/if}

<br />

{#if !submitted}
	<button class="btn btn-primary" onclick={handleSubmit} disabled={!selectedAnswer}>Submit</button>
{:else}
	<button class="btn btn-primary" onclick={nextQuestion}>Next Question</button>
{/if}

<br />
<br />

<h1><strong>Punkte: {score} von {data.questions.length}</strong></h1>
{selectedAnswer}

<br />
