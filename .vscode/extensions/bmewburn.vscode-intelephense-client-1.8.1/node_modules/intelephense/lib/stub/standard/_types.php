<?php

namespace {

   
    /**
     * @template TKey of array-key
     * @template TSend
     * @template TReturn
     * @template TYield
     *
     * Generator objects are returned from generators, cannot be instantiated via new.
     * @link https://secure.php.net/manual/en/class.generator.php
     * @link https://wiki.php.net/rfc/generators
     *
     * @template-implements Iterator<TKey, TYield>
     */
    final class Generator implements Iterator
    {
        /**
         * Throws an exception if the generator is currently after the first yield.
         * @return void
         */
        public function rewind(): void {}

        /**
         * Returns false if the generator has been closed, true otherwise.
         * @return bool
         */
        public function valid(): bool {}

        /**
         * Returns whatever was passed to yield or null if nothing was passed or the generator is already closed.
         * @return TYield
         */
        public function current(): mixed {}

        /**
         * Returns the yielded key or, if none was specified, an auto-incrementing key or null if the generator is already closed.
         * @return TKey
         */
        #[LanguageLevelTypeAware(['8.0' => 'mixed'], default: 'string|float|int|bool|null')]
        public function key() {}

        /**
         * Resumes the generator (unless the generator is already closed).
         * @return void
         */
        public function next(): void {}

        /**
         * Sets the return value of the yield expression and resumes the generator (unless the generator is already closed).
         * @param TSend $value
         * @return TYield|null
         */
        public function send(mixed $value): mixed {}

        /**
         * Throws an exception at the current suspension point in the generator.
         * @param Throwable $exception
         * @return TYield
         */
        function throw(Throwable $exception) {}

        /**
         * Returns whatever was passed to return or null if nothing.
         * Throws an exception if the generator is still valid.
         * @link https://wiki.php.net/rfc/generator-return-expressions
         * @return TReturn
         * @since 7.0
         */
        public function getReturn(): mixed {}

        /**
         * Serialize callback
         * Throws an exception as generators can't be serialized.
         * @link https://php.net/manual/en/generator.wakeup.php
         * @return void
         */
        public function __wakeup() {}
    }

    class ClosedGeneratorException extends Exception {}
}

