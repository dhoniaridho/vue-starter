export default defineComponent({
  setup: () => {
    const count = ref(0)

    const increment = () => {
      count.value++
    }

    return () => {
      return (
        <div>
          <p>counter.tsx</p>
          <h2>{count.value}</h2>
          <button onClick={increment}>Increment</button>
        </div>
      )
    }
  },
})
